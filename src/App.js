import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import axios from "axios";

const Heading = styled.h1`
  background-color: #0d1721;
  color: #cfcdcd;
  padding: 15px;
  text-align: center;
  font-size: 35px;

  @media (max-width: 426px) {
    padding: 12px;
    font-size: 31px;
  }
`;

const CardContainer = styled.div`
  /* border: 1px solid white; */
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 525px) {
    padding: 10px 0px;
  }
`;

const Card = styled.div`
  box-shadow: 0px 0px 7px 2px rgba(11, 191, 56, 0.75);
  border: 1px solid #04aa6d;
  background-color: #0d1721;
  border-radius: 5px;
  width: 230px;
  margin: 10px;
  color: #ddd;

  @media (max-width: 525px) {
    width: 160px;
  }
`;

const CircleContainer = styled.div`
  /* border: 1px solid white; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  @media (max-width: 525px) {
    height: 165px;
  }
`;

const Counting = styled.span`
  background-color: #118d21;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 175px;
  height: 175px;
  border-radius: 50%;
  font-weight: 700;
  font-size: 70px;
  @media (max-width: 525px) {
    width: 145px;
    height: 145px;
  }
`;

const InfoContainer = styled.div`
  text-align: center;
  padding: 0px 0px 10px;

  h2 {
    font-size: 20px;
  }

  span {
    font-size: 14px;
  }
`;

const PaginationContainer = styled.div`
  /* background-color: #0d1721; */
  color: #ddd;

  ul {
    /* border: 1px solid white; */
    display: flex;
    align-items: center;
    justify-content: center;
    list-style-type: none;
    padding: 15px 0px;

    @media (max-width: 426px) {
      padding: 15px 20px;
    }

    li {
      border-radius: 50%;
      margin: 0px 5px;
      width: 40px;
      height: 40px;

      @media (max-width: 426px) {
        margin: 0px 2px;
        width: 30px;
        height: 30px;
        font-size: 13px;
      }

      a {
        background-color: #0d1721;
        border: 2px solid #04aa6d;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
          background-color: #118d21;
          border: 2px solid #ddd;
        }

        &:active {
          transform: translateY(1.5px);
        }
      }
    }
  }
`;

const BottomContainer = styled.div`
  background-color: #0d1721;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ddd;
  padding: 20px 0px;

  @media (max-width: 426px) {
    padding: 15px 0px;
  }

  h3 {
    padding: 5px 15px;
    font-size: 17px;
    border-right: 2px solid #ddd;

    @media (max-width: 426px) {
      padding: 7px 8px;
      font-size: 15px;
    }

    span {
      border: 2px solid #04aa6d;
      background-color: black;
      padding: 1px 6px;
      border-radius: 5px;
    }
  }
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    padding: 5px 5px 5px 15px;
    border: none;

    @media (max-width: 426px) {
      padding: 0px 5px;
    }
  }

  select {
    background-color: black;
    border: 2px solid #04aa6d;
    font-size: 17px;
    padding: 0px 3px;
    font-weight: 700;
    border-radius: 5px;
    color: #ddd;
    cursor: pointer;

    @media (max-width: 426px) {
      font-size: 15px;
      padding: 0px;
      margin-right: 10px;
    }
  }
`;

const App = () => {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemsLimit, setItemsLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    try {
      const getItems = async () => {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${itemsLimit}`
        );

        setItems(res.data);

        const totalFetchedItems = res.headers.get("x-total-count");
        setTotalItems(totalFetchedItems);
        // console.log(totalFetchedItems);

        setPageCount(Math.ceil(totalFetchedItems / itemsLimit));
      };

      getItems();
    } catch {
      console.log("Something went wrong with API Call !");
    }
  }, [currentPage, itemsLimit]);

  //------------------------------------------------------

  const handlePageClick = (pageNum) => {
    // console.log(pageNum); // It will return {selected:Number}
    const currentClickedPage = pageNum.selected + 1;
    setCurrentPage(currentClickedPage);
  };

  const handleChange = (e) => {
    setItemsLimit(e.target.value);
  };

  return (
    <>
      <Heading>React - Pagination</Heading>

      <CardContainer>
        {items?.map((user) => (
          <Card key={user.id}>
            <CircleContainer>
              <Counting>{user.id}</Counting>
            </CircleContainer>
            <InfoContainer>
              <h2>SP SINGH</h2>
              <span>Hi there, I'm MERN Stack Developer.</span>
            </InfoContainer>
          </Card>
        ))}
      </CardContainer>

      <PaginationContainer>
        <ReactPaginate
          previousLabel="<"
          breakLabel="..."
          nextLabel=">"
          pageCount={pageCount}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
        />
      </PaginationContainer>

      <BottomContainer>
        <h3>
          Total items found: <span>{totalItems}</span>
        </h3>
        <SelectContainer>
          <h3>Items per page:</h3>
          <select onChange={handleChange}>
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
            <option>50</option>
          </select>
        </SelectContainer>
      </BottomContainer>
    </>
  );
};

export default App;
