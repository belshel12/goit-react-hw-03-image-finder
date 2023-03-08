import { Button } from "./LoadButton.styled";

const LoadButton = ({onLoad}) => {
return <Button onClick={onLoad}>Load more</Button>
}

export default LoadButton;