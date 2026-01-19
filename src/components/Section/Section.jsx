import { useEffect, useState } from "react";
import styles from "./Section.module.css";
import { CircularProgress } from "@mui/material";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function Section({ title, data, filterSource, type }) {
  const [carouselToggle, setCarouselToggle] = useState(true);
  const [filters, setFilters] = useState([{ key: "all", label: "All" }]);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

  const handleToggle = () => {
    setCarouselToggle(!carouselToggle);
  };

  useEffect(() => {
    if (filterSource && Array.isArray(filterSource)) {
      setFilters([{ key: "all", label: "All" }, ...filterSource]);
    }
  }, [filterSource]);

  const showFilters = filters.length > 1;
  const cardsToRender = data.filter((card) =>
    showFilters && selectedFilterIndex !== 0
      ? card.genre.key === filters[selectedFilterIndex].key
      : card,
  );

  return (
    <div>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.toggleText} onClick={handleToggle}>
          {!showFilters && (!carouselToggle ? "Collapse" : "Show all")}
        </h4>
      </div>
      {showFilters && (
        <div className={styles.wrapper}>
          <Tabs
            value={selectedFilterIndex}
            onChange={(e, value) => {
              setSelectedFilterIndex(value);
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor: "var(--color-primary)",
              },
            }}
          >
            {filters.map((ele, index) => (
              <Tab className={styles.tab} label={ele.label} key={ele.key} />
            ))}
          </Tabs>
        </div>
      )}
      {cardsToRender.length === 0 ? (
        <CircularProgress />
      ) : (
        <div className={styles.cardContainer}>
          {!carouselToggle ? (
            <div className={styles.cardsWrapper}>
              {cardsToRender.map((item) => (
                <Card key={item.id} data={item} type={type} />
              ))}
            </div>
          ) : (
            <Carousel
              data={cardsToRender}
              renderComponent={(data) => <Card data={data} type={type} />}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Section;
