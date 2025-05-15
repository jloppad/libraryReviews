export default function DivInput({ props }) {
    return (
        <div className={props.classContainer}>
            <label className={props.classTitle}>{props.title}</label>
            <input
                type={props.type}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                className={props.classInput}
                required
                placeholder={props.placeholderText}
            />
        </div>
    );
}
