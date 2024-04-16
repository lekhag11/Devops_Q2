function IfNot({ children, condition }) {
    return !condition && (<>{children}</>);
}

export default IfNot;
