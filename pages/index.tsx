import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData: { [key: string]: string } = {};

    Array.from(e.currentTarget.elements).forEach((element: Element) => {
      const field = element as HTMLInputElement | HTMLTextAreaElement;
      if (!field.name) return;
      formData[field.name] = field.value;
    });

    await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Contact me for cool stuff!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Contact Me</h1>

        <div className={styles.grid}>
          <style jsx>{`
            form {
              font-size: 1.2em;
              max-width: 400px; /* Adjust as needed */
              margin: auto; /* Center the form */
            }

            label {
              display: block;
              margin-bottom: 0.5em; /* Increase spacing between labels */
            }

            input,
            textarea {
              width: 100%;
              padding: 0.5em;
              margin-bottom: 1em; /* Increase spacing between fields */
              border: 1px solid #ccc; /* Add border for clarity */
              border-radius: 0.3em; /* Rounded corners */
              box-sizing: border-box; /* Ensure padding and border are included in width */
            }

            button {
              color: white;
              font-size: 1em;
              background-color: blueviolet;
              padding: 0.8em 1em;
              border: none;
              border-radius: 0.2em;
              cursor: pointer; /* Show pointer on hover */
            }
          `}</style>
          <form onSubmit={handleOnSubmit}>
            <p>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <input id="email" type="text" name="email" />
            </p>
            <p>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} />{" "}
              {/* Specify rows for textarea */}
            </p>
            <p>
              <button>Submit</button>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
