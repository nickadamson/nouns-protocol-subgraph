import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
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
} from "../generated/Treasury/Treasury"

export function createDelayUpdatedEvent(
  prevDelay: BigInt,
  newDelay: BigInt
): DelayUpdated {
  let delayUpdatedEvent = changetype<DelayUpdated>(newMockEvent())

  delayUpdatedEvent.parameters = new Array()

  delayUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "prevDelay",
      ethereum.Value.fromUnsignedBigInt(prevDelay)
    )
  )
  delayUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newDelay",
      ethereum.Value.fromUnsignedBigInt(newDelay)
    )
  )

  return delayUpdatedEvent
}

export function createGracePeriodUpdatedEvent(
  prevGracePeriod: BigInt,
  newGracePeriod: BigInt
): GracePeriodUpdated {
  let gracePeriodUpdatedEvent = changetype<GracePeriodUpdated>(newMockEvent())

  gracePeriodUpdatedEvent.parameters = new Array()

  gracePeriodUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "prevGracePeriod",
      ethereum.Value.fromUnsignedBigInt(prevGracePeriod)
    )
  )
  gracePeriodUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newGracePeriod",
      ethereum.Value.fromUnsignedBigInt(newGracePeriod)
    )
  )

  return gracePeriodUpdatedEvent
}

export function createTreasuryInitializedEvent(
  version: BigInt
): TreasuryInitialized {
  let treasuryInitializedEvent = changetype<TreasuryInitialized>(newMockEvent())

  treasuryInitializedEvent.parameters = new Array()

  treasuryInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return treasuryInitializedEvent
}

export function createTreasuryOwnerCanceledEvent(
  owner: Address,
  canceledOwner: Address
): TreasuryOwnerCanceled {
  let treasuryOwnerCanceledEvent = changetype<TreasuryOwnerCanceled>(
    newMockEvent()
  )

  treasuryOwnerCanceledEvent.parameters = new Array()

  treasuryOwnerCanceledEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  treasuryOwnerCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "canceledOwner",
      ethereum.Value.fromAddress(canceledOwner)
    )
  )

  return treasuryOwnerCanceledEvent
}

export function createTreasuryOwnerPendingEvent(
  owner: Address,
  pendingOwner: Address
): TreasuryOwnerPending {
  let treasuryOwnerPendingEvent = changetype<TreasuryOwnerPending>(
    newMockEvent()
  )

  treasuryOwnerPendingEvent.parameters = new Array()

  treasuryOwnerPendingEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  treasuryOwnerPendingEvent.parameters.push(
    new ethereum.EventParam(
      "pendingOwner",
      ethereum.Value.fromAddress(pendingOwner)
    )
  )

  return treasuryOwnerPendingEvent
}

export function createTreasuryOwnerUpdatedEvent(
  prevOwner: Address,
  newOwner: Address
): TreasuryOwnerUpdated {
  let treasuryOwnerUpdatedEvent = changetype<TreasuryOwnerUpdated>(
    newMockEvent()
  )

  treasuryOwnerUpdatedEvent.parameters = new Array()

  treasuryOwnerUpdatedEvent.parameters.push(
    new ethereum.EventParam("prevOwner", ethereum.Value.fromAddress(prevOwner))
  )
  treasuryOwnerUpdatedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return treasuryOwnerUpdatedEvent
}

export function createTransactionCanceledEvent(
  proposalId: Bytes
): TransactionCanceled {
  let transactionCanceledEvent = changetype<TransactionCanceled>(newMockEvent())

  transactionCanceledEvent.parameters = new Array()

  transactionCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromFixedBytes(proposalId)
    )
  )

  return transactionCanceledEvent
}

export function createTransactionExecutedEvent(
  proposalId: Bytes,
  targets: Array<Address>,
  values: Array<BigInt>,
  payloads: Array<Bytes>
): TransactionExecuted {
  let transactionExecutedEvent = changetype<TransactionExecuted>(newMockEvent())

  transactionExecutedEvent.parameters = new Array()

  transactionExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromFixedBytes(proposalId)
    )
  )
  transactionExecutedEvent.parameters.push(
    new ethereum.EventParam("targets", ethereum.Value.fromAddressArray(targets))
  )
  transactionExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(values)
    )
  )
  transactionExecutedEvent.parameters.push(
    new ethereum.EventParam("payloads", ethereum.Value.fromBytesArray(payloads))
  )

  return transactionExecutedEvent
}

export function createTransactionScheduledEvent(
  proposalId: Bytes,
  timestamp: BigInt
): TransactionScheduled {
  let transactionScheduledEvent = changetype<TransactionScheduled>(
    newMockEvent()
  )

  transactionScheduledEvent.parameters = new Array()

  transactionScheduledEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromFixedBytes(proposalId)
    )
  )
  transactionScheduledEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return transactionScheduledEvent
}

export function createTreasuryUpgradedEvent(impl: Address): TreasuryUpgraded {
  let treasuryUpgradedEvent = changetype<TreasuryUpgraded>(newMockEvent())

  treasuryUpgradedEvent.parameters = new Array()

  treasuryUpgradedEvent.parameters.push(
    new ethereum.EventParam("impl", ethereum.Value.fromAddress(impl))
  )

  return treasuryUpgradedEvent
}
