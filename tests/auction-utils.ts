import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AuctionBid,
  AuctionCreated,
  AuctionSettled,
  DurationUpdated,
  AuctionInitialized,
  MinBidIncrementPercentageUpdated,
  AuctionOwnerCanceled,
  AuctionOwnerPending,
  AuctionOwnerUpdated,
  Paused,
  ReservePriceUpdated,
  TimeBufferUpdated,
  Unpaused,
  AuctionUpgraded
} from "../generated/Auction/Auction"

export function createAuctionBidEvent(
  tokenId: BigInt,
  bidder: Address,
  amount: BigInt,
  extended: boolean,
  endTime: BigInt
): AuctionBid {
  let auctionBidEvent = changetype<AuctionBid>(newMockEvent())

  auctionBidEvent.parameters = new Array()

  auctionBidEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  auctionBidEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  auctionBidEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  auctionBidEvent.parameters.push(
    new ethereum.EventParam("extended", ethereum.Value.fromBoolean(extended))
  )
  auctionBidEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )

  return auctionBidEvent
}

export function createAuctionCreatedEvent(
  tokenId: BigInt,
  startTime: BigInt,
  endTime: BigInt
): AuctionCreated {
  let auctionCreatedEvent = changetype<AuctionCreated>(newMockEvent())

  auctionCreatedEvent.parameters = new Array()

  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )

  return auctionCreatedEvent
}

export function createAuctionSettledEvent(
  tokenId: BigInt,
  winner: Address,
  amount: BigInt
): AuctionSettled {
  let auctionSettledEvent = changetype<AuctionSettled>(newMockEvent())

  auctionSettledEvent.parameters = new Array()

  auctionSettledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  auctionSettledEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  auctionSettledEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return auctionSettledEvent
}

export function createDurationUpdatedEvent(duration: BigInt): DurationUpdated {
  let durationUpdatedEvent = changetype<DurationUpdated>(newMockEvent())

  durationUpdatedEvent.parameters = new Array()

  durationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "duration",
      ethereum.Value.fromUnsignedBigInt(duration)
    )
  )

  return durationUpdatedEvent
}

export function createAuctionInitializedEvent(
  version: BigInt
): AuctionInitialized {
  let auctionInitializedEvent = changetype<AuctionInitialized>(newMockEvent())

  auctionInitializedEvent.parameters = new Array()

  auctionInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return auctionInitializedEvent
}

export function createMinBidIncrementPercentageUpdatedEvent(
  minBidIncrementPercentage: BigInt
): MinBidIncrementPercentageUpdated {
  let minBidIncrementPercentageUpdatedEvent = changetype<
    MinBidIncrementPercentageUpdated
  >(newMockEvent())

  minBidIncrementPercentageUpdatedEvent.parameters = new Array()

  minBidIncrementPercentageUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "minBidIncrementPercentage",
      ethereum.Value.fromUnsignedBigInt(minBidIncrementPercentage)
    )
  )

  return minBidIncrementPercentageUpdatedEvent
}

export function createAuctionOwnerCanceledEvent(
  owner: Address,
  canceledOwner: Address
): AuctionOwnerCanceled {
  let auctionOwnerCanceledEvent = changetype<AuctionOwnerCanceled>(
    newMockEvent()
  )

  auctionOwnerCanceledEvent.parameters = new Array()

  auctionOwnerCanceledEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  auctionOwnerCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "canceledOwner",
      ethereum.Value.fromAddress(canceledOwner)
    )
  )

  return auctionOwnerCanceledEvent
}

export function createAuctionOwnerPendingEvent(
  owner: Address,
  pendingOwner: Address
): AuctionOwnerPending {
  let auctionOwnerPendingEvent = changetype<AuctionOwnerPending>(newMockEvent())

  auctionOwnerPendingEvent.parameters = new Array()

  auctionOwnerPendingEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  auctionOwnerPendingEvent.parameters.push(
    new ethereum.EventParam(
      "pendingOwner",
      ethereum.Value.fromAddress(pendingOwner)
    )
  )

  return auctionOwnerPendingEvent
}

export function createAuctionOwnerUpdatedEvent(
  prevOwner: Address,
  newOwner: Address
): AuctionOwnerUpdated {
  let auctionOwnerUpdatedEvent = changetype<AuctionOwnerUpdated>(newMockEvent())

  auctionOwnerUpdatedEvent.parameters = new Array()

  auctionOwnerUpdatedEvent.parameters.push(
    new ethereum.EventParam("prevOwner", ethereum.Value.fromAddress(prevOwner))
  )
  auctionOwnerUpdatedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return auctionOwnerUpdatedEvent
}

export function createPausedEvent(user: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return pausedEvent
}

export function createReservePriceUpdatedEvent(
  reservePrice: BigInt
): ReservePriceUpdated {
  let reservePriceUpdatedEvent = changetype<ReservePriceUpdated>(newMockEvent())

  reservePriceUpdatedEvent.parameters = new Array()

  reservePriceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "reservePrice",
      ethereum.Value.fromUnsignedBigInt(reservePrice)
    )
  )

  return reservePriceUpdatedEvent
}

export function createTimeBufferUpdatedEvent(
  timeBuffer: BigInt
): TimeBufferUpdated {
  let timeBufferUpdatedEvent = changetype<TimeBufferUpdated>(newMockEvent())

  timeBufferUpdatedEvent.parameters = new Array()

  timeBufferUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timeBuffer",
      ethereum.Value.fromUnsignedBigInt(timeBuffer)
    )
  )

  return timeBufferUpdatedEvent
}

export function createUnpausedEvent(user: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return unpausedEvent
}

export function createAuctionUpgradedEvent(impl: Address): AuctionUpgraded {
  let auctionUpgradedEvent = changetype<AuctionUpgraded>(newMockEvent())

  auctionUpgradedEvent.parameters = new Array()

  auctionUpgradedEvent.parameters.push(
    new ethereum.EventParam("impl", ethereum.Value.fromAddress(impl))
  )

  return auctionUpgradedEvent
}
