import { Form } from "react-router-dom";
import { MdOutlineDiscount } from "react-icons/md";
import Cartupper from "./Cartupper";
import Cartlower from "./Cartlower";

const Cart = () => {
  return (
    <>
      <div
        className="flex flex-col items-center
                lg:flex-row lg:items-start lg:justify-center lg:gap-8"
      >
        <Cartupper />
        {/* <Cartlower /> */}
      </div>
    </>
  );
};

export default Cart;
