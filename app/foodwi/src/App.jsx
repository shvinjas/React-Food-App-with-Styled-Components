import styled from "styled-components";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import SearchResult from "./components/SearchResult";

export const BASE_URL = "http://localhost:9000";

function App() {
  //we will store the backend data in this state
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState();
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {}, []);

  //perform network call

  // const fetchFoodData = async () => {
  //   const response = await fetch(BASE_URL);
  //   const json = response.json();
  //   console.log(json);
  // };
  const filterFood = (type) => {
    if (type == "all") {
      setFilterData(data);
      setSelectedBtn("all");
      return;
    }
    const filterData =
      data &&
      data.filter((value) =>
        value.type.toLowerCase().includes(type.toLowerCase())
      );
    setFilterData(filterData);
    setSelectedBtn(type);
  };
  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setLoading(false);
        setData(json);
        setFilterData(json);
      } catch (error) {
        setError("unable to fetch Data");
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue == "") {
      setFilterData(null);
    }

    const filterData =
      data &&
      data.filter((value) =>
        value.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    setFilterData(filterData);
  };

  //console.log(data);

  // const temp = {
  //   name: "Boiled Egg",
  //   price: 10,
  //   text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  //   image: "/images/egg.png",
  //   type: "breakfast",
  // };

  if (error) return <div>{error}</div>;
  if (loading) return <div>{loading}</div>;


  const FilterBtn=[
    {
    name:"all",
    type:"all"
  },
  {
    name:"Breakfast",
    type:"breakfast"
  },
  {
    name:"Lunch",
    type:"lunch"
  },
  {
    name:"Dinner",
    type:"dinner"
  }









  ]

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src=" ./images/logo.svg" alt="logo"></img>
          </div>

          <div className="search">
            <input onChange={searchFood} placeholder="Search ..."></input>
          </div>
        </TopContainer>
        <FilterContainer>

          {/*try to use map*/}
          {/* <Button onClick={() => filterFood("all")}>All</Button>
          <Button onClick={() => filterFood("breakfast")}>Breakfast</Button>
          <Button onClick={() => filterFood("lunch")}>Lunch</Button>
          <Button onClick={() => filterFood("dinner")}>Dinner</Button> */}
        {FilterBtn.map((value,i)=>(<Button isSelected={selectedBtn==value.type} key={i} onClick={() => filterFood(value.type)}>{value.name}</Button>))}




        </FilterContainer>
      </Container>
      <SearchResult data={filterData} />
    </>
  );
}

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.div`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder{
        color:white;
      }
    }
  }

  @media (0<width<600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding-bottom: 40px;
`;
export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? " green " : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? " white " : "#ff4343")};

  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;


`;
