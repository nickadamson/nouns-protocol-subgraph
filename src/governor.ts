import {
  GovernorInitialized as GovernorInitializedEvent,
  GovernorOwnerCanceled as GovernorOwnerCanceledEvent,
  GovernorOwnerPending as GovernorOwnerPendingEvent,
  GovernorOwnerUpdated as GovernorOwnerUpdatedEvent,
  ProposalCanceled as ProposalCanceledEvent,
  ProposalCreated as ProposalCreatedEvent,
  ProposalExecuted as ProposalExecutedEvent,
  ProposalQueued as ProposalQueuedEvent,
  ProposalThresholdBpsUpdated as ProposalThresholdBpsUpdatedEvent,
  ProposalVetoed as ProposalVetoedEvent,
  QuorumVotesBpsUpdated as QuorumVotesBpsUpdatedEvent,
  GovernorUpgraded as GovernorUpgradedEvent,
  VetoerUpdated as VetoerUpdatedEvent,
  VoteCast as VoteCastEvent,
  VotingDelayUpdated as VotingDelayUpdatedEvent,
  VotingPeriodUpdated as VotingPeriodUpdatedEvent
} from "../generated/Governor/Governor"
import {
  GovernorInitialized,
  GovernorOwnerCanceled,
  GovernorOwnerPending,
  GovernorOwnerUpdated,
  ProposalCanceled,
  ProposalCreated,
  ProposalExecuted,
  ProposalQueued,
  ProposalThresholdBpsUpdated,
  ProposalVetoed,
  QuorumVotesBpsUpdated,
  GovernorUpgraded,
  VetoerUpdated,
  VoteCast,
  VotingDelayUpdated,
  VotingPeriodUpdated
} from "../generated/schema"

export function handleGovernorInitialized(
  event: GovernorInitializedEvent
): void {
  let entity = new GovernorInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGovernorOwnerCanceled(
  event: GovernorOwnerCanceledEvent
): void {
  let entity = new GovernorOwnerCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.canceledOwner = event.params.canceledOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGovernorOwnerPending(
  event: GovernorOwnerPendingEvent
): void {
  let entity = new GovernorOwnerPending(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.pendingOwner = event.params.pendingOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGovernorOwnerUpdated(
  event: GovernorOwnerUpdatedEvent
): void {
  let entity = new GovernorOwnerUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.prevOwner = event.params.prevOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalCanceled(event: ProposalCanceledEvent): void {
  let entity = new ProposalCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalCreated(event: ProposalCreatedEvent): void {
  let entity = new ProposalCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId
  entity.targets = event.params.targets
  entity.values = event.params.values
  entity.calldatas = event.params.calldatas
  entity.description = event.params.description
  entity.descriptionHash = event.params.descriptionHash
  entity.proposal_proposer = event.params.proposal.proposer
  entity.proposal_timeCreated = event.params.proposal.timeCreated
  entity.proposal_againstVotes = event.params.proposal.againstVotes
  entity.proposal_forVotes = event.params.proposal.forVotes
  entity.proposal_abstainVotes = event.params.proposal.abstainVotes
  entity.proposal_voteStart = event.params.proposal.voteStart
  entity.proposal_voteEnd = event.params.proposal.voteEnd
  entity.proposal_proposalThreshold = event.params.proposal.proposalThreshold
  entity.proposal_quorumVotes = event.params.proposal.quorumVotes
  entity.proposal_executed = event.params.proposal.executed
  entity.proposal_canceled = event.params.proposal.canceled
  entity.proposal_vetoed = event.params.proposal.vetoed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalExecuted(event: ProposalExecutedEvent): void {
  let entity = new ProposalExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalQueued(event: ProposalQueuedEvent): void {
  let entity = new ProposalQueued(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId
  entity.eta = event.params.eta

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalThresholdBpsUpdated(
  event: ProposalThresholdBpsUpdatedEvent
): void {
  let entity = new ProposalThresholdBpsUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.prevBps = event.params.prevBps
  entity.newBps = event.params.newBps

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalVetoed(event: ProposalVetoedEvent): void {
  let entity = new ProposalVetoed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleQuorumVotesBpsUpdated(
  event: QuorumVotesBpsUpdatedEvent
): void {
  let entity = new QuorumVotesBpsUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.prevBps = event.params.prevBps
  entity.newBps = event.params.newBps

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGovernorUpgraded(event: GovernorUpgradedEvent): void {
  let entity = new GovernorUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.impl = event.params.impl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVetoerUpdated(event: VetoerUpdatedEvent): void {
  let entity = new VetoerUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.prevVetoer = event.params.prevVetoer
  entity.newVetoer = event.params.newVetoer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteCast(event: VoteCastEvent): void {
  let entity = new VoteCast(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voter = event.params.voter
  entity.proposalId = event.params.proposalId
  entity.support = event.params.support
  entity.weight = event.params.weight
  entity.reason = event.params.reason

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVotingDelayUpdated(event: VotingDelayUpdatedEvent): void {
  let entity = new VotingDelayUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.prevVotingDelay = event.params.prevVotingDelay
  entity.newVotingDelay = event.params.newVotingDelay

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVotingPeriodUpdated(
  event: VotingPeriodUpdatedEvent
): void {
  let entity = new VotingPeriodUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.prevVotingPeriod = event.params.prevVotingPeriod
  entity.newVotingPeriod = event.params.newVotingPeriod

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
