// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HealthChallenge
 * @notice Fitness accountability platform with staking and rewards
 * @dev Users stake tokens, complete daily check-ins, winners split prize pool
 */
contract HealthChallenge {
    // ============================================
    // STATE VARIABLES
    // ============================================
    uint256 public challengeCounter;
    uint256 public platformFee = 5;
    address public owner;

    // ============================================
    // DATA STRUCTURES
    // ============================================
    struct Challenge {
        string name;
        uint256 stakeAmount;
        uint256 durationDays;
        uint256 startTime;
        uint256 totalStaked;
        uint256 participantCount;
        address creator;
        bool isActive;
    }

    struct Participant {
        uint256 stakedAmount;
        uint256 checkInCount;
        bool hasCompleted;
        bool rewardClaimed;
    }

    // ============================================
    // STORAGE MAPPINGS
    // ============================================
    mapping(uint256 => Challenge) public challenges;
    mapping(uint256 => mapping(address => Participant)) public participants;
    mapping(uint256 => mapping(address => mapping(uint256 => bool))) public checkIns;
    mapping(uint256 => address[]) public participantList;

    // ============================================
    // EVENTS
    // ============================================
    event ChallengeCreated(
        uint256 indexed challengeId,
        string name,
        uint256 stakeAmount,
        uint256 durationDays,
        address indexed creator
    );
    event ParticipantJoined(
        uint256 indexed challengeId,
        address indexed participant,
        uint256 amount
    );
    event CheckInRecorded(
        uint256 indexed challengeId,
        address indexed participant,
        uint256 day,
        uint256 totalCheckIns
    );
    event ChallengeCompleted(
        uint256 indexed challengeId,
        address indexed participant
    );
    event RewardClaimed(
        uint256 indexed challengeId,
        address indexed participant,
        uint256 amount
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    function createChallenge(
        string memory _name,
        uint256 _stakeAmount,
        uint256 _durationDays
    ) external returns (uint256) {
        require(_stakeAmount > 0, "Stake must be positive");
        require(_durationDays > 0 && _durationDays <= 365, "Invalid duration");
        require(bytes(_name).length > 0, "Name required");

        uint256 challengeId = challengeCounter++;
        challenges[challengeId] = Challenge({
            name: _name,
            stakeAmount: _stakeAmount,
            durationDays: _durationDays,
            startTime: block.timestamp,
            totalStaked: 0,
            participantCount: 0,
            creator: msg.sender,
            isActive: true
        });
        emit ChallengeCreated(challengeId, _name, _stakeAmount, _durationDays, msg.sender);
        return challengeId;
    }

    function joinChallenge(uint256 _challengeId) external payable {
        Challenge storage challenge = challenges[_challengeId];
        require(challenge.isActive, "Challenge not active");
        require(msg.value == challenge.stakeAmount, "Incorrect stake amount");
        require(participants[_challengeId][msg.sender].stakedAmount == 0, "Already joined");

        participants[_challengeId][msg.sender] = Participant({
            stakedAmount: msg.value,
            checkInCount: 0,
            hasCompleted: false,
            rewardClaimed: false
        });
        participantList[_challengeId].push(msg.sender);
        challenge.totalStaked += msg.value;
        challenge.participantCount++;

        emit ParticipantJoined(_challengeId, msg.sender, msg.value);
    }

    function checkIn(uint256 _challengeId, uint256 _day) external {
        Challenge storage challenge = challenges[_challengeId];
        Participant storage participant = participants[_challengeId][msg.sender];
        require(participant.stakedAmount > 0, "Not a participant");
        require(!participant.hasCompleted, "Already completed");
        require(_day > 0 && _day <= challenge.durationDays, "Invalid day");
        require(!checkIns[_challengeId][msg.sender][_day], "Already checked in for this day");

        checkIns[_challengeId][msg.sender][_day] = true;
        participant.checkInCount++;

        if (participant.checkInCount == challenge.durationDays) {
            participant.hasCompleted = true;
            emit ChallengeCompleted(_challengeId, msg.sender);
        }
        emit CheckInRecorded(_challengeId, msg.sender, _day, participant.checkInCount);
    }

    function claimReward(uint256 _challengeId) external {
        Challenge storage challenge = challenges[_challengeId];
        Participant storage participant = participants[_challengeId][msg.sender];
        require(participant.hasCompleted, "Challenge not completed");
        require(!participant.rewardClaimed, "Reward already claimed");

        uint256 winnerCount = 0;
        address[] memory pList = participantList[_challengeId];
        for (uint256 i = 0; i < pList.length; i++) {
            if (participants[_challengeId][pList[i]].hasCompleted) {
                winnerCount++;
            }
        }
        require(winnerCount > 0, "No winners");

        uint256 platformCut = (challenge.totalStaked * platformFee) / 100;
        uint256 rewardPool = challenge.totalStaked - platformCut;
        uint256 reward = rewardPool / winnerCount;

        participant.rewardClaimed = true;
        (bool success, ) = payable(msg.sender).call{value: reward}("");
        require(success, "Transfer failed");
        emit RewardClaimed(_challengeId, msg.sender, reward);
    }

    function getChallenge(uint256 _challengeId) external view returns (Challenge memory) {
        return challenges[_challengeId];
    }

    function getParticipant(uint256 _challengeId, address _user) external view returns (Participant memory) {
        return participants[_challengeId][_user];
    }

    function getParticipantCount(uint256 _challengeId) external view returns (uint256) {
        return participantList[_challengeId].length;
    }

    function getParticipantAt(uint256 _challengeId, uint256 _index) external view returns (address) {
        return participantList[_challengeId][_index];
    }

    function hasCheckedIn(uint256 _challengeId, address _user, uint256 _day) external view returns (bool) {
        return checkIns[_challengeId][_user][_day];
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    function setPlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 10, "Fee too high");
        platformFee = _newFee;
    }
}
