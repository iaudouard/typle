type Props = {
  testString?: string;
};

export const Test = (props: Props) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-500">
        {props.testString}
      </h3>
    </div>
  );
};
