interface Props {
  body: string;
  from: string;
}

export const Message = ({ body, from }: Props) => {
  return (
    <div>
      <p>{`${from}: ${body}`}</p>
    </div>
  );
};
