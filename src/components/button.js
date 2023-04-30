import styled from 'styled-components';

const Button = styled.button`
display: block;
background-color: #1E90FF;
border: none;
color: #FFF;
padding: 10px;
margin-top: 20px;
border-radius: 5px;
width: 100%;
cursor: pointer;
transition: background-color 0.3s ease-in-out;
}

:hover {
background-color: #007FFF;
}
:disabled {
    cursor: auto;
    opacity: 0.5;
  }
`;

export default Button;
