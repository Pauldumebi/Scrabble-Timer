import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type modalCompProps = {
  show: boolean;
  onHide: () => void;
  players: { name: string }[];
  setPlayers: React.Dispatch<React.SetStateAction<{ name: string }[]>>;
  noOfPlayers: number | string;
  timerMinutes: string;
  timerSeconds: string;
  setNoOfPlayers: React.Dispatch<React.SetStateAction<string | number>>;
  setTimerMinutes: React.Dispatch<React.SetStateAction<string>>;
  setTimerSeconds: React.Dispatch<React.SetStateAction<string>>;
};

const ModalComp = (props: modalCompProps) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { name, value } = e.target;
    const list = [...props.players];
    list[index][name as keyof { name: string }] = value;
    props.setPlayers(list);
  };

  const handleRemovePlayer = () => {
    const list = [...props.players];
    list.splice(list.length - 1, 1);
    props.setPlayers(list);
  };

  const handleAddPlayer = (placeholder: string) => {
    props.setPlayers([
      ...props.players,
      {
        name: placeholder,
      },
    ]);
  };

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setNoOfPlayers(event.target.value);
    const difference =
      parseInt(event.target.value) - parseInt(props.noOfPlayers as string);

    if (parseInt(props.noOfPlayers as string) < parseInt(event.target.value)) {
      console.log(difference, "difference");
      //   debugger;
      if (difference <= 1) {
        const placeholder = `player ${event.target.value}`;
        handleAddPlayer(placeholder);
      } else {
        handleAddPlayer(`player 3`);
        handleAddPlayer(`player 4`);
      }
    } else if (parseInt(props.noOfPlayers as string) > parseInt(event.target.value)) {
      if (difference <= 1) {
        handleRemovePlayer();
      } else {
        handleRemovePlayer();
        handleRemovePlayer();
      }
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
          Game Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="m-auto">
        <div className="mb-4">
          <h5>Number of players</h5>
          <div className="" onChange={onChangeValue}>
            <div>
              <input
                type="radio"
                value="2"
                name="noOfPlayers"
                checked={props.noOfPlayers == "2"}
                style={{ cursor: "pointer" }}
              />
              <span style={{ fontSize: "18px", paddingLeft: "5px" }}>2</span>
            </div>

            <div>
              <input
                type="radio"
                value="3"
                name="noOfPlayers"
                checked={props.noOfPlayers == "3"}
                style={{ cursor: "pointer" }}
              />
              <span style={{ fontSize: "18px", paddingLeft: "5px" }}>3</span>
            </div>

            <div>
              <input
                type="radio"
                value="4"
                name="noOfPlayers"
                checked={props.noOfPlayers == "4"}
                style={{ cursor: "pointer" }}
              />
              <span style={{ fontSize: "18px", paddingLeft: "5px" }}>4</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h5>Time per player</h5>
          <div>
            <input
              type="number"
              className="timer-1 mx-1"
              placeholder={props.timerMinutes}
              value={props.timerMinutes}
              onChange={(e) => props.setTimerMinutes(e.target.value)}
            />
            :
            <input
              type="number"
              className="timer-2 mx-1"
              placeholder={props.timerSeconds}
              value={props.timerSeconds}
              onChange={(e) => props.setTimerSeconds(e.target.value)}
            />
          </div>
        </div>

        <div>
          <h5>Players' names: </h5>
          <div className="d-flex flex-column w-100 players-name">
            {props.players.map((x, i) => {
              return (
                <div key={i}>
                  <input
                    type="text"
                    placeholder={x.name}
                    name="name"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComp;
