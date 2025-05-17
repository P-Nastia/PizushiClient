const BaseTextInput = ({field,label,handleOnChange,value,error}) => {
    return(
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type="text"
                className={`form-control ${error ? "is-invalid" : ""}`}
                name={field}
                value={value}
                onChange={handleOnChange}

            />
            {error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    )
}
export default BaseTextInput;