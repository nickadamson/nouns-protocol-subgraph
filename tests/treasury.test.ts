import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { DelayUpdated } from "../generated/schema"
import { DelayUpdated as DelayUpdatedEvent } from "../generated/Treasury/Treasury"
import { handleDelayUpdated } from "../src/treasury"
import { createDelayUpdatedEvent } from "./treasury-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let prevDelay = BigInt.fromI32(234)
    let newDelay = BigInt.fromI32(234)
    let newDelayUpdatedEvent = createDelayUpdatedEvent(prevDelay, newDelay)
    handleDelayUpdated(newDelayUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DelayUpdated created and stored", () => {
    assert.entityCount("DelayUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DelayUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "prevDelay",
      "234"
    )
    assert.fieldEquals(
      "DelayUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newDelay",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
