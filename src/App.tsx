import "./App.css";
import Cards from "./components/Cards";
import { useState } from "react";
import { useCountdown } from "./hooks/useCountdown";
import { IoMdSettings } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { BsFillPauseFill } from "react-icons/bs";
import { BsFillPlayFill } from "react-icons/bs";
import ModalComp from "./components/ModalComp";

type playerInfo = {
  name: string;
};

const App = () => {
  const [controls, setControls] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [timerMinutes, setTimerMinutes] = useState<string>("20");
  const [timerSeconds, setTimerSeconds] = useState<string>("00");
  const [noOfPlayers, setNoOfPlayers] = useState<string | number>("2");
  const [players, setPlayers] = useState<playerInfo[]>([
    {
      name: "Player 1",
    },
    {
      name: "Player 2",
    },
  ]);

  return (
    <div>
      <ModalComp
        show={modalShow}
        onHide={() => setModalShow(false)}
        players={players}
        setPlayers={setPlayers}
        noOfPlayers={noOfPlayers}
        setNoOfPlayers={setNoOfPlayers}
        timerMinutes={timerMinutes}
        timerSeconds={timerSeconds}
        setTimerMinutes={setTimerMinutes}
        setTimerSeconds={setTimerSeconds}
      />
      <div
        className="grid-container"
        style={{
          gridTemplateColumns:
            players.length == 2
              ? "auto"
              : "auto ".repeat(Math.round(players.length / 2)),
        }}
      >
        {players.map((item, i) => {
          return (
            <Cards
              key={i}
              time={`${timerMinutes}:${timerSeconds}`}
              name={item.name}
              rotate={
                i == 0 ||
                (players.length > 2 && i + 1 <= Math.round(players.length / 2))
                  ? "-180"
                  : 0
              }
              cell={i + 1 == 3 && players.length == 3 && "cell"}
            />
          );
        })}
      </div>

      <div className="m-auto absolute-center">
        <div style={controlStyles} onClick={() => setModalShow(true)}>
          <IoMdSettings size={30} style={isPointer} />
        </div>

        <div onClick={() => setControls((prev) => !prev)}>
          {controls ? (
            <div style={{ ...controlStyles, ...isMargin }}>
              <BsFillPlayFill size={30} style={isPointer} />
            </div>
          ) : (
            <div style={{ ...controlStyles, ...isMargin }}>
              <BsFillPauseFill size={30} style={isPointer} />
            </div>
          )}
        </div>

        <div style={controlStyles}>
          <GrPowerReset size={30} style={isPointer} />
        </div>
      </div>
    </div>
  );
};

export default App;

const controlStyles = {
  background: "white",
  borderRadius: "10px",
  padding: "7px",
};

const isPointer = {
  cursor: "pointer",
};

const isMargin = {
  margin: "0 10px",
};
