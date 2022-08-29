import { Radio, Space } from "antd";

const RadioGroup = (props:any) => {
  return (
    <div>
      <Radio.Group className="text-left float-left" defaultValue={""}>
        <Space direction="vertical">
          {props.options.map((q:any, key:number) => (
            <Radio value={q.text} key={key} checked={true} onClick={() => props.onChangeValue(q.text)}>
              {q.text}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default RadioGroup;
