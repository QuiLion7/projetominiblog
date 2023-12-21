import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h1>
        Sobre o Mini <span>Blog</span>
      </h1>
      <p>
        Este projeto é um blog simples que utiliza React no front-end e Firebase
        no back-end. Ele foi desenvolvido por mim, com o objetivo de realizar
        operações CRUD (create, read, update, delete), além de exibir as
        informações cadastradas no banco de dados.
      </p>
      <Link to="/posts/create" className="btn">
        Criar Post
      </Link>
    </div>
  );
};

export default About;
