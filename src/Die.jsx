import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";

export default function Die(props) {
  const styles = {
    color: props.isHeld ? "#f6bbc8" : "white",
  };
  const dieIcons = {
    1: faDiceOne,
    2: faDiceTwo,
    3: faDiceThree,
    4: faDiceFour,
    5: faDiceFive,
    6: faDiceSix,
  };
  return (
    <div className="die-face" onClick={props.holdDice}>
      <FontAwesomeIcon
        icon={dieIcons[props.value]}
        style={styles}
        className="die-icon"
      />
    </div>
  );
}

Die.propTypes = {
  isHeld: PropTypes.bool.isRequired,
  holdDice: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};
