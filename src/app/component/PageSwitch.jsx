"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./css/PageSwitch.module.css";

const PageSwitch = ({ totalPages, pathname }) => {
  const router = useRouter();
  const params = useSearchParams();

  const currentPage = Number(params.get("page")) || 1;

  const handlePageChange = (name, value) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set(name, value);
    return newParams.toString();
  };

  return (
    <nav>
      <ul className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <li key={page}>
              <button
                onClick={() =>
                  router.push(`${pathname}?${handlePageChange("page", page)}`)
                }
                className={`${styles.pageButton} ${
                  page === currentPage ? styles.active : ""
                }`}
                disabled={page === currentPage} 
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PageSwitch;
