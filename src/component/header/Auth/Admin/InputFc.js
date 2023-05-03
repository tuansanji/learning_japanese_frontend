import PropTypes from "prop-types";

const InputFc = ({
  course,
  field,
  handle,
  text,
  className = "",
  type = "text",
  search = false,
}) => {
  return !search ? (
    <div className="flex items-center w-full gap-5 ">
      <label
        className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
        htmlFor="stage"
      >
        {field} :
      </label>
      <input
        className={
          className
            ? `${className}`
            : `w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent `
        }
        type={type}
        value={course[field]}
        placeholder={`Điền ${text}`}
        onChange={(e) => {
          handle({
            ...course,
            [field]: e.target.value,
          });
        }}
      ></input>
    </div>
  ) : (
    <input
      className={
        className
          ? `${className}`
          : `w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent `
      }
      type={type}
      value={course[field]}
      placeholder={`Điền ${text}`}
      onChange={(e) => {
        handle({
          ...course,
          [field]: e.target.value,
        });
      }}
    ></input>
  );
};

InputFc.propTypes = {
  course: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default InputFc;
