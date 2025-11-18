import { connection, Connection } from "next/server";
import Link from "next/link";
import Shop from "@/app/shop/page";
import styles from "./HomePage.module.css";


export default async function HomePage() {
  
  await connection()
  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.storyScript}>Welcome to Raihan Interactive Shop</h1>
            <p className={styles.heroSubtitle}>
              Your one-stop shop for amazing products delivered fast.
            </p>
            <Link href="/shop">
              <button className={styles.btnHero}>Start Shopping</button>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Shop With Us?</h2>
        <div className={styles.featureCards}>
          <div className={styles.featureCard}>
            <span className={styles.icon}>🚚</span>
            <h3 className={styles.title}>Fast Delivery</h3>
            <p>Get your products delivered to your door in record time.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.icon}>💳</span>
            <h3 className={styles.title}>Secure Payments</h3>
            <p>All transactions are 100% secure and encrypted.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.icon}>⭐</span>
            <h3 className={styles.title}>Top Quality</h3>
            <p>We offer only the best products from trusted brands.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.icon}>📞</span>
            <h3 className={styles.title}>24/7 Support</h3>
            <p>Our support team is always here to help you anytime.</p>
          </div>
        </div>
      </section>

      <section className={styles.featuredProducts}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div>
          <Shop preview={true} />
        </div>
        <div className={styles.viewAllWrapper}>
          <Link href="/shop">
            <button className={styles.btnViewAll}>View All Products</button>
          </Link>
        </div>
      </section>

      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
        <div className={styles.testimonialCards}>
          <div className={styles.testimonialCard}>
            <p>"Great products, fast shipping, and amazing service!"</p>
            <h4>- Nazmul Islam.</h4>
          </div>
          <div className={styles.testimonialCard}>
            <p>"I love this shop! The quality is top-notch."</p>
            <h4>- Ratul Hossain.</h4>
          </div>
          <div className={styles.testimonialCard}>
            <p>"Highly recommend for anyone looking for reliable products."</p>
            <h4>- Reven Devnath.</h4>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <h2 className={styles.footerTitle}>Ready to find your favorite products?</h2>
          <Link href="/shop">
            <button className={styles.footerBtn}>Shop Now</button>
          </Link>

          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} Mostafa Raihan. All rights reserved.</p>
            <div className={styles.social}>
              <a href="https://www.facebook.com/Mostafa.Raihan.07/" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.linkedin.com/in/mostafaraihanbd/" target="_blank" rel="noopener noreferrer">Linkedin</a>
              <a href="https://github.com/MostafaRaihan" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}