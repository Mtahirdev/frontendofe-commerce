import { CiDeliveryTruck } from "react-icons/ci";
import { PiArrowsCounterClockwiseLight } from "react-icons/pi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const SecondFooter = () => {
  const items = [
    {
      icon: <CiDeliveryTruck className="text-6xl" />,
      title: "Free Shipping",
      text: "on order over Rs:400",
    },
    {
      icon: <RiSecurePaymentLine className="text-6xl" />,
      title: "Secure Payment",
      text: "100% secure payment",
    },
    {
      icon: <PiArrowsCounterClockwiseLight className="text-6xl" />,
      title: "Easy Return",
      text: "30 days return policy",
    },
    {
      icon: <TfiHeadphoneAlt className="text-5xl" />,
      title: "24/7 Support",
      text: "dedicated support",
    },
  ];

  return (
    <div className="mx-auto w-[92%] mt-8 rounded-2xl bg-brand-50 border border-brand-100 py-6 px-4 flex flex-col gap-6 sm:grid sm:grid-cols-2 desk:grid-cols-4 justify-items-center">
      {items.map((it) => (
        <div key={it.title} className="flex items-center gap-3">
          <div className="text-brand-600">{it.icon}</div>
          <div>
            <h1 className="font-extrabold text-ink-800">{it.title}</h1>
            <p className="text-ink-500 text-sm">{it.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecondFooter;
