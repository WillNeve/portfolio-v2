import { useRef, useState } from "react";

//icons
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import styled, { keyframes } from "styled-components";
import { hexToRgba, textSeperationAnim } from "@/app/config/utilities";
import { ButtonIcon } from "@/app/components/Styles/Buttons";

//emailjs
import emailjs from "@emailjs/browser";

const ContactWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  .header {
    font-family: "Modeseven", sans-serif;
  }
`;

const SocialLinks = styled.ul`
  display: flex;
`;

const ContactForm = styled.form`
  /* border: 2px solid purple; */
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
  input,
  textarea {
    background: none;
    border: 2px solid ${(props) => props.theme.hackerGreen};
    border-radius: 0px; // to override some IOS default radius
    color: ${(props) => hexToRgba(props.theme.foregroundWhite, 0.9)};
    font-family: "Montserrat", sans-serif;
    font-size: 20px;
    width: 100%;
    padding: 5px;
    &:focus {
      border-radius: none;
      outline: none;
      border: 2px solid ${(props) => props.theme.foregroundWhite};
    }
  }
  button {
    font-size: 20px;
    padding: 5px;
    padding-right: 7px;
    margin-top: 10px;
    background: none;
    border: 2px solid ${(props) => props.theme.hackerGreen};
    color: ${(props) => props.theme.hackerGreen};
    cursor: pointer;
    transition: background 0.1s ease;
    &:hover {
      background: ${(props) => props.theme.foregroundWhite};
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  align-items: flex-start;
  margin: 12px 0px;
  p {
    display: none;
    margin-top: 0;
    font-size: 16px;
    color: red;
    animation: none;
  }
  &.bad {
    input,
    textarea {
      border: 2px solid red;
    }
    p {
      display: block;
    }
  }
`;

const Notice = styled.p`
  font-size: 18px;
  opacity: ${(props) => (props.$disabled ? "0" : "1")};
  scale: ${(props) => (props.$disabled ? "0.2" : "1")};
  color: ${(props) => props.theme.hackerGreen};
  transition: opacity 0.2s linear, scale 0.2s linear;
  animation: none;
`;

const Contact = () => {
  const form = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const sendButton = useRef(null);

  const [messageSent, setMessageSent] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendEmail(form.current);
  };

  const validateFields = () => {
    const inputGroups = [
      nameInputRef.current,
      emailInputRef.current,
      messageInputRef.current,
    ];
    const badInputs = [];
    let valid = 0;
    inputGroups.forEach((group) => {
      const input = group.childNodes[1];
      const errorNotice = group.childNodes[2];
      switch (input.name) {
        case "name":
          if (input.value.length > 0) {
            valid += 1;
            group.classList.remove("bad");
            errorNotice.innerHTML = "";
          } else {
            group.classList.add("bad");
            errorNotice.innerHTML = "name: <br/> - must be present";
          }
          break;
        case "email":
          if (
            input.value.length > 0 &&
            /^ *\w+@\w+(\.\w+)+ *$/.test(input.value)
          ) {
            valid += 1;
            group.classList.remove("bad");
            errorNotice.innerHTML = "";
          } else {
            group.classList.add("bad");
            errorNotice.innerHTML = "email: <br/> - must be valid format";
          }
          break;

        case "message":
          if (input.value.length > 30) {
            valid += 1;
            group.classList.remove("bad");
            errorNotice.innerHTML = "";
          } else {
            group.classList.add("bad");
            errorNotice.innerHTML =
              "message: <br/> - must be present <br/> - greater than 30 chars";
          }
          break;
      }
    });
    return valid === inputGroups.length;
  };

  const sendEmail = (form) => {
    const valid = validateFields(form);
    if (valid) {
      emailjs
        .sendForm(
          "service_p0bpq6y",
          "template_y980eew",
          form,
          "ipfB8exKZpNX557hJ"
        )
        .then(
          (result) => {
            if (result.status === 200) {
              setMessageSent(true);
              form.reset();
              setTimeout(() => {
                setMessageSent(false);
              }, 2000);
            }
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <ContactWrapper>
      <div className="header">
        <h1>Contact me.</h1>
        <p>Where you can find me</p>
      </div>
      <SocialLinks>
        <li>
          <ButtonIcon
            href="https://www.linkedin.com/in/wneve/"
            target="_blank"
            className="icon"
          >
            <FaLinkedin />
          </ButtonIcon>
        </li>

        <li>
          <ButtonIcon
            href="https://github.com/WillNeve"
            target="_blank"
            className="icon"
          >
            <FaSquareGithub />
          </ButtonIcon>
        </li>

        <li>
          <ButtonIcon
            href="mailto:williamneve6000@gmail.com"
            target="_blank"
            className="icon"
          >
            <FaEnvelope />
          </ButtonIcon>
        </li>
      </SocialLinks>
      <p>Or send me a messsage</p>
      <ContactForm
        action="#"
        aria-label="Send me a Message Form"
        onSubmit={handleFormSubmit}
        ref={form}
      >
        <FormGroup ref={nameInputRef}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
          <p>error</p>
        </FormGroup>
        <FormGroup ref={emailInputRef}>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
          <p></p>
        </FormGroup>
        <FormGroup ref={messageInputRef}>
          <label htmlFor="message">Message</label>
          <textarea type="text" name="message" />
          <p></p>
        </FormGroup>
        <button type="submit" ref={sendButton}>
          {messageSent ? "SENT" : "SEND"}
        </button>
        <Notice $disabled={!messageSent}>Your Message has been sent</Notice>
      </ContactForm>
    </ContactWrapper>
  );
};

export default Contact;
