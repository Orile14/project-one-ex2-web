function InputBox({ param, value, onChange }) {
    return (
        <div className="login-container">
            <label htmlFor={param}>{param}:</label>
            <input
                type={param === 'password' ? 'password' : 'text'}
                id={param}
                name={param}
                placeholder={`Enter your ${param}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
export default InputBox;