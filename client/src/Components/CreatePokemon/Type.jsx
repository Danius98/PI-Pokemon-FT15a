import './Type.css'

export default function Type(props) {
    const { Tipo } = props
    return (
        <div>
            <h4 className="text">{Tipo}</h4>
        </div>
    )
}