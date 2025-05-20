import classNames from "classnames";

const BaseTextInput = ({field,label,handleOnChange,value,error,touched}) => {
    const isError = error && touched;
    return(
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type="text"
                className={classNames ("form-control",{
                    "is-invalid": isError // якщо є error то виводимо індикатор про помилку
                })}
                name={field}
                value={value}
                onChange={handleOnChange}
            />
            {isError && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    )
}
export default BaseTextInput;