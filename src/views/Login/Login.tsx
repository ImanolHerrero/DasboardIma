import axiosIntances from "../../utils/axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router";

const axios: any = axiosIntances();

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      console.info(form)
      const response = await axios.post("/useradmi/login", form);
      if (response.data) {
        console.info(response.data);
        localStorage.setItem("coder_token", response.data.token.access_token);
        navigate("/user");
      } else {
        window.alert("no se pudo iniciar sesion");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="">
      <div>
        <input
          type="text"
          placeholder="ingrese su username"
          name="name"
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="ingrese su email"
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="ingrese su password"
          onChange={handleChange}
        />
      </div>
      <button onClick={onSubmit}>Submit</button>
    </form>
  );
};

export default Login;
