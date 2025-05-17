const BaseFileInput = ({field,label,handleOnChange,error}) => {
    return(
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type="file"
                className={`form-control ${error ? "is-invalid" : ""}`}
                name={field}
                onChange={handleOnChange}
                accept="image/*"

            />
            {error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    )
}
export default BaseFileInput;