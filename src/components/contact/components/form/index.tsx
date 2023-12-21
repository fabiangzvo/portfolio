import { useTranslations } from "next-intl";

import Input from "@components/input";
import Button from "@components/button";

interface FormProps {
  handleClick: React.MouseEventHandler<HTMLFormElement>;
}

function Form(props: FormProps) {
  const { handleClick } = props;
  const translations = useTranslations("contact");

  return (
    <form
      className="flex flex-col w-full bg-background border border-stroke rounded-xl px-[6em] py-[6em] shadow-lg shadow-stroke"
      onSubmit={handleClick}
    >
      <h1 className="pointer-events-none text-paragraph w-full text-center text-3xl font-extrabold mb-10">
        {translations("contact")}
      </h1>
      <Input
        name="contactName"
        label={translations("name")}
        type="text"
        placeholder="Fabián Guzmán O."
      />
      <Input
        name="email"
        label={translations("email")}
        type="email"
        placeholder="example@example.com"
      />
      <div className="mb-10">
        <label htmlFor="message" className="block mb-2 text-xl text-text">
          {translations("message")}
        </label>
        <textarea
          id="message"
          className="bg-stroke text-lg rounded-lg block w-full p-2.5"
          placeholder={translations("messagePlaceholder")}
        ></textarea>
      </div>
      <Button label={translations("send")} />
    </form>
  );
}

export default Form;
