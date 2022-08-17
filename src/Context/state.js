import { createContext, useContext, useEffect, useReducer } from "react";

const StateContext = createContext();

const StateProvider = ({ reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => dispatch({ type: "Initialize State" }), []);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;

export const useSelector = (selector) =>
  selector(useContext(StateContext).state);
export const useDispatch = () => useContext(StateContext).dispatch;
