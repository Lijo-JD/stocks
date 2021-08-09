import React, { useEffect, useRef } from "react";
import NavBar from "./navbar";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Container from "react-bootstrap/Container";
import { getStocksNames, getSingleStock, setStock } from "../actions/stocksAction";
import _ from "lodash";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";

const Stocks = () => {
  const { loading, loadingStock, error, stockNames, singleStock } = useSelector(
    (state) => ({
      loading: state.StocksReducer.loading,
      loadingStock: state.StocksReducer.loadingStock,
      error: state.StocksReducer.error,
      stockNames: state.StocksReducer.stockNames,
      singleStock: state.StocksReducer.singleStock,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const check = useRef(false);

  useEffect(() => {
    if (_.isEmpty(stockNames) && !error) {
      dispatch(getStocksNames());
    } else {
      console.log(stockNames);
    }
  }, [stockNames]);

  useEffect(() => {
    console.log(singleStock);
  }, [singleStock]);

  useEffect(() => {
    if (check.current) {
      toast.error("An unexpected error occured. Please try again", {
        autoClose: 5000,
      });
    } else {
      check.current = true;
    }
  }, [error]);

  const handleOnSelect = (item) => {
    dispatch(getSingleStock({ id: item.id }));
  };

  const handleOnSearch = (string, results) => {
    dispatch(setStock());
  }

  return (
    <>
      <NavBar />
      <Container>
        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!loading && (
          <div>
            Select Company:{" "}
            <ReactSearchAutocomplete
              items={stockNames}
              onSelect={handleOnSelect}
              onSearch={handleOnSearch}
              autoFocus
            />
          </div>
        )}
      </Container>
      <Container>
        <div>
          {loadingStock && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {!loadingStock && singleStock && (
            <Card>
              <Card.Body>
                <Card.Title>{singleStock.Name}</Card.Title>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <td>Current_Market_Price</td>
                      <td>{singleStock.Current_Market_Price}</td>
                    </tr>
                    <tr>
                      <td>Market_Cap</td>
                      <td>{singleStock.Market_Cap}</td>
                    </tr>
                    <tr>
                      <td>Stock_PE</td>
                      <td>{singleStock.Stock_PE}</td>
                    </tr>
                    <tr>
                      <td>Dividend_Yield</td>
                      <td>{singleStock.Dividend_Yield}</td>
                    </tr>
                    <tr>
                      <td>ROCE_</td>
                      <td>{singleStock.ROCE_}</td>
                    </tr>
                    <tr>
                      <td>ROE_Previous_Annum</td>
                      <td>{singleStock.ROE_Previous_Annum}</td>
                    </tr>
                    <tr>
                      <td>Debt_to_Equity</td>
                      <td>{singleStock.Debt_to_Equity}</td>
                    </tr>
                    <tr>
                      <td>EPS</td>
                      <td>{singleStock.EPS}</td>
                    </tr>
                    <tr>
                      <td>Reserves</td>
                      <td>{singleStock.Reserves}</td>
                    </tr>
                    <tr>
                      <td>Debt</td>
                      <td>{singleStock.Debt}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </div>
      </Container>
    </>
  );
};

export default Stocks;
