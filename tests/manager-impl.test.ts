import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { DAODeployed } from "../generated/schema"
import { DAODeployed as DAODeployedEvent } from "../generated/ManagerImpl/ManagerImpl"
import { handleDAODeployed } from "../src/manager-impl"
import { createDAODeployedEvent } from "./manager-impl-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let token = Address.fromString("0x0000000000000000000000000000000000000001")
    let metadata = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let auction = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let treasury = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let governor = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newDAODeployedEvent = createDAODeployedEvent(
      token,
      metadata,
      auction,
      treasury,
      governor
    )
    handleDAODeployed(newDAODeployedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DAODeployed created and stored", () => {
    assert.entityCount("DAODeployed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DAODeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DAODeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "metadata",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DAODeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "auction",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DAODeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "treasury",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DAODeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "governor",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
