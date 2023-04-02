import Link from "next/link";

function HomePage() {
  return (
    <>
      <nav>
        <ul>
          <li>
          <Link href="/about" legacyBehavior>
  <a>About</a>
</Link>
          </li>
          <li>
            <Link href="#section1" passHref legacyBehavior>
              <a>Section 1</a>
            </Link>
          </li>
          <li>
            <Link href="#section2" passHref legacyBehavior>
              <a>Section 2</a>
            </Link>
          </li>
          <li>
            <Link href="#section3" passHref legacyBehavior>
              <a>Section 3</a>
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <section id="section1">
          <h2>Section 1</h2>
          <p>Lorem ipsum dolor sit amet...</p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </section>
        <section id="section2">
          <h2>Section 2</h2>
          <p>Consectetur adipiscing elit...</p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </section>
        <section id="section3">
          <h2>Section 3</h2>
          <p>Sed do eiusmod tempor incididunt...</p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </section>
      </main>
    </>
  );
}

export default HomePage;
