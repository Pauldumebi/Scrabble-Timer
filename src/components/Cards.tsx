type cardItems = {
  time: string;
  name: string;
  rotate: string | number;
  cell: string | boolean;
};

const Cards = ({ time, name, rotate, cell }: cardItems) => {
  return (
    <div
      className={`d-flex justify-content-center flex-column text-center ${cell}`}
      style={{
        border: "1px solid black",
        WebkitTransform: `rotate(${rotate ? rotate : 0}deg)`,
        cursor: "pointer",
      }}
    >
      <h1>{time}</h1>
      <p style={{ fontSize: "30px" }}>{name}</p>
    </div>
  );
};

export default Cards;
