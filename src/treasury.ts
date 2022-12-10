import {
  DelayUpdated as DelayUpdatedEvent,
  GracePeriodUpdated as GracePeriodUpdatedEvent,
  TreasuryInitialized as TreasuryInitializedEvent,
  TreasuryOwnerCanceled as TreasuryOwnerCanceledEvent,
  TreasuryOwnerPending as TreasuryOwnerPendingEvent,
  TreasuryOwnerUpdated as TreasuryOwnerUpdatedEvent,
  TransactionCanceled as TransactionCanceledEvent,
  TransactionExecuted as TransactionExecutedEvent,
  TransactionScheduled as TransactionScheduledEvent,
  TreasuryUpgraded as TreasuryUpgradedEvent
} from "../generated/Treasury/Treasury"
import {
  DelayUpdated,
  GracePeriodUpdated,
  TreasuryInitialized,
  TreasuryOwnerCanceled,
  TreasuryOwnerPending,
  TreasuryOwnerUpdated,
  TransactionCanceled,
  TransactionExecuted,
  TransactionScheduled,
  TreasuryUpgraded
} from "../generated/schema"

export function handleDelayUpdated(event: DelayUpdatedEvent): void {
  let entity = new DelayUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.prevDelay = event.params.prevDelay
  entity.newDelay = event.params.newDelay

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGracePeriodUpdated(event: GracePeriodUpdatedEvent): void {
  let entity = new GracePeriodUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.prevGracePeriod = event.params.prevGracePeriod
  entity.newGracePeriod = event.params.newGracePeriod

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTreasuryInitialized(
  event: TreasuryInitializedEvent
): void {
  let entity = new TreasuryInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTreasuryOwnerCanceled(
  event: TreasuryOwnerCanceledEvent
): void {
  let entity = new TreasuryOwnerCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.canceledOwner = event.params.canceledOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTreasuryOwnerPending(
  event: TreasuryOwnerPendingEvent
): void {
  let entity = new TreasuryOwnerPending(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.pendingOwner = event.params.pendingOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTreasuryOwnerUpdated(
  event: TreasuryOwnerUpdatedEvent
): void {
  let entity = new TreasuryOwnerUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.prevOwner = event.params.prevOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransactionCanceled(
  event: TransactionCanceledEvent
): void {
  let entity = new TransactionCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransactionExecuted(
  event: TransactionExecutedEvent
): void {
  let entity = new TransactionExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId
  entity.targets = event.params.targets
  entity.values = event.params.values
  entity.payloads = event.params.payloads

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransactionScheduled(
  event: TransactionScheduledEvent
): void {
  let entity = new TransactionScheduled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTreasuryUpgraded(event: TreasuryUpgradedEvent): void {
  let entity = new TreasuryUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.impl = event.params.impl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
