interface Props {
  body: string;
  from: string;
}

export const Message = ({ body, from }: Props) => {
  return (
    <li
      className={`p-2 my-2 rounded-lg table ${
        from === 'Me' ? 'bg-green-700 ml-auto' : 'bg-sky-700 mr-auto'
      }`}
    >
      <p>{`${from}: ${body}`}</p>
    </li>
  );
};
