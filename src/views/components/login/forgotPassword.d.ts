import React from 'react';
interface ForgotPasswordProps {
    onBackToLogin: () => void;
}
interface ForgotPasswordState {
}
export default class ForgotPaswords extends React.Component<ForgotPasswordProps, ForgotPasswordState> {
    constructor(props: ForgotPasswordProps);
    handleComeBackFormLogin: () => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
