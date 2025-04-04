import { useComparison } from "../contexts/ComparisonContext"
import UnknownImg from "../assets/images/question_mark.png"
import TickImg from "../assets/images/tick.png"
import { Character } from "../types/CartoonopiaTypes"

const RED = "#4a0c01"
const GREEN = "#265313"

function getImageUrl(url: string) {
  return new URL(`/src/assets/${url}`, import.meta.url).href
}

function TableRow({
  attr,
  leftInvisible = true,
  rightInvisible = true,
  leftColour = "black",
  rightColour = "black",
}: {
  attr: string
  leftInvisible?: boolean
  rightInvisible?: boolean
  leftColour?: string
  rightColour?: string
}) {
  return (
    <tr className="font-bold">
      <td
        className="flex justify-center items-center px-12 py-1 align-middle"
        style={{ backgroundColor: leftColour }}
      >
        <div
          style={{
            backgroundImage: `url(${TickImg})`,
            visibility: leftInvisible ? "hidden" : "visible",
          }}
          className="w-12 h-12 bg-no-repeat bg-contain rounded-full"
        ></div>
      </td>
      <td>{attr.toUpperCase()}</td>
      <td
        className="flex justify-center items-center px-12 py-1 align-middle"
        style={{ backgroundColor: rightColour }}
      >
        <div
          style={{
            backgroundImage: `url(${TickImg})`,
            visibility: rightInvisible ? "hidden" : "visible",
          }}
          className="w-12 h-12 bg-no-repeat bg-contain rounded-full"
        ></div>
      </td>
    </tr>
  )
}

function ComparisonTable({
  left = null,
  right = null,
}: {
  left?: Character | null
  right?: Character | null
}) {
  let leftScore = 0
  let rightScore = 0
  let winner = null
  let strengthWinner = "left"
  let speedWinner = "left"
  let skillWinner = "left"
  let fearFactorWinner = "left"
  let powerWinner = "left"
  let intelligenceWinner = "left"
  let wealthWinner = "left"

  if (left !== null && right !== null) {
    if (left.strength > right.strength) {
      strengthWinner = "left"
      leftScore++
    } else if (right.strength > left.strength) {
      strengthWinner = "right"
      rightScore++
    } else {
      strengthWinner = Math.random() > 0.5 ? "left" : "right"
      strengthWinner === "left" ? leftScore++ : rightScore++
    }

    if (left.speed > right.speed) {
      strengthWinner = "left"
      leftScore++
    } else if (right.speed > left.speed) {
      strengthWinner = "right"
      rightScore++
    } else {
      strengthWinner = Math.random() > 0.5 ? "left" : "right"
      strengthWinner === "left" ? leftScore++ : rightScore++
    }

    if (left.fear_factor > right.fear_factor) {
      fearFactorWinner = "left"
      leftScore++
    } else if (right.fear_factor > left.fear_factor) {
      fearFactorWinner = "right"
      rightScore++
    } else {
      fearFactorWinner = Math.random() > 0.5 ? "left" : "right"
      fearFactorWinner === "left" ? leftScore++ : rightScore++
    }

    if (left.power > right.power) {
      powerWinner = "left"
      leftScore++
    } else if (right.power > left.power) {
      powerWinner = "right"
      rightScore++
    } else {
      powerWinner = Math.random() > 0.5 ? "left" : "right"
      powerWinner === "left" ? leftScore++ : rightScore++
    }

    if (left.intelligence > right.intelligence) {
      intelligenceWinner = "left"
      leftScore++
    } else if (right.intelligence > left.intelligence) {
      intelligenceWinner = "right"
      rightScore++
    } else {
      intelligenceWinner = Math.random() > 0.5 ? "left" : "right"
      intelligenceWinner === "left" ? leftScore++ : rightScore++
    }

    if (left.wealth > right.wealth) {
      wealthWinner = "left"
      leftScore++
    } else if (right.wealth > left.wealth) {
      wealthWinner = "right"
      rightScore++
    } else {
      wealthWinner = Math.random() > 0.5 ? "left" : "right"
      wealthWinner === "left" ? leftScore++ : rightScore++
    }

    if (leftScore > rightScore) {
      winner = "left"
    } else if (rightScore > leftScore) {
      winner = "right"
    } else {
      winner = Math.random() > 0.5 ? "left" : "right"
    }
  }

  return (
    <table className="bg-black text-white text-center">
      <tbody>
        {left !== null && right !== null && (
          <>
            <TableRow
              attr={"Strength"}
              leftInvisible={strengthWinner === "right"}
              rightInvisible={strengthWinner === "left"}
              leftColour={winner === "left" ? GREEN : RED}
              rightColour={winner === "right" ? GREEN : RED}
            />
            <TableRow
              attr={"Speed"}
              leftInvisible={speedWinner === "right"}
              rightInvisible={speedWinner === "left"}
              leftColour={winner === "left" ? GREEN : RED}
              rightColour={winner === "right" ? GREEN : RED}
            />
            <TableRow
              attr={"Skill"}
              leftInvisible={skillWinner === "right"}
              rightInvisible={skillWinner === "left"}
              leftColour={winner === "left" ? GREEN : RED}
              rightColour={winner === "right" ? GREEN : RED}
            />
            <TableRow
              attr={"Fear Factor"}
              leftInvisible={fearFactorWinner === "right"}
              rightInvisible={fearFactorWinner === "left"}
              leftColour={winner === "left" ? GREEN : RED}
              rightColour={winner === "right" ? GREEN : RED}
            />
            <TableRow
              attr={"Power"}
              leftInvisible={powerWinner === "right"}
              rightInvisible={powerWinner === "left"}
              leftColour={winner === "left" ? GREEN : RED}
              rightColour={winner === "right" ? GREEN : RED}
            />
            <TableRow
              attr={"Intelligence"}
              leftInvisible={intelligenceWinner === "right"}
              rightInvisible={intelligenceWinner === "left"}
              leftColour={winner === "left" ? GREEN : RED}
              rightColour={winner === "right" ? GREEN : RED}
            />
            <TableRow
              attr={"Wealth"}
              leftInvisible={wealthWinner === "right"}
              rightInvisible={wealthWinner === "left"}
              leftColour={winner === "left" ? GREEN : RED}
              rightColour={winner === "right" ? GREEN : RED}
            />
          </>
        )}
        {(left === null || right === null) && (
          <>
            <TableRow attr="Strength" />
            <TableRow attr="Speed" />
            <TableRow attr="Skill" />
            <TableRow attr="Fear Factor" />
            <TableRow attr="Power" />
            <TableRow attr="Intelligence" />
            <TableRow attr="Wealth" />
          </>
        )}
      </tbody>
    </table>
  )
}

function CharacterImage({ src }: { src: string }) {
  return (
    <img
      src={getImageUrl(src)}
      onError={(e) => {
        e.currentTarget.src = UnknownImg
      }}
      alt={"Hero image"}
      className="object-fill w-48 h-48 bg-cover bg-center bg-white rounded-full"
    />
  )
}

function ComparisonBox() {
  const { currentComparisons } = useComparison()

  if (currentComparisons.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-12 my-10">
        <div className="w-full flex justify-center items-center py-4 bg-black">
          <CharacterImage src={UnknownImg} />
        </div>
        <ComparisonTable left={null} right={null} />
      </div>
    )
  }

  if (currentComparisons.length == 1) {
    return (
      <div className="flex flex-col items-center gap-y-12 my-10">
        <div className="w-full flex justify-center items-center py-4 bg-black text-white">
          <table className="border-separate border-spacing-x-32">
            <thead>
              <tr>
                <th>{currentComparisons[0].name}</th>
                <th>Unknown</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <CharacterImage src={currentComparisons[0].image_url} />
                </td>
                <td>
                  <CharacterImage src={UnknownImg} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ComparisonTable left={currentComparisons[0]} right={null} />
      </div>
    )
  }

  const [left, right] = currentComparisons

  return (
    <div className="flex flex-col items-center gap-y-12 my-10">
      <div className="w-full flex justify-center items-center py-4 bg-black text-white">
        <table className="border-separate border-spacing-x-32">
          <thead>
            <tr>
              <th>{left.name}</th>
              <th>{right.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CharacterImage src={left.image_url} />
              </td>
              <td>
                <CharacterImage src={right.image_url} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ComparisonTable left={left} right={right} />
    </div>
  )
}

export default ComparisonBox
