const TextInput = ({ placeholder, ...props }: any) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      style={{
        height: "32px",
        borderRadius: "8px 2px 2px 8px",
        border: "none",
        paddingLeft: "16px",
        marginRight: "6px",
        backgroundColor: "#EEF2F2",
        width: "250px",
        ...props,
      }}
    />
  );
};

export default TextInput;
