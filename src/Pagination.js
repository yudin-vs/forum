import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material/";

export function ComponentPagination(props) {
  const navigate = useNavigate();
  let amountPages = Math.ceil(props.total / props.perPage);
  console.log(props.total);
  const pages = (n) => {
    let arr = [];
    if (n) for (let i = 1; i <= n; i++) arr.push(i);
    return arr;
  };

  const listItems = pages(amountPages).map((index) => {
    const isCurrent = +props.currentPage === +index;
    const className = isCurrent ? "PagesButtonActive" : "PagesButton";
    return (
      <span
        className={className}
        key={index}
        onClick={() => {
          navigate("/table/" + index);
        }}
      >
        {index}
      </span>
    );
  });
  return (
    <>
      <div>{listItems}</div>
    </>
  );
}
