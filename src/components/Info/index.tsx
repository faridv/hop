import React from "react";
import { Backdrop, InfoStyled } from "./style";
import { ButtonIcon } from "../../icons/Button";

function Info({ visible }: { visible: boolean }) {
  return (
    <>
      <InfoStyled className={visible ? "visible" : "hidden"}>
        <h3>پلتفرم متن باز بومی HbbTV</h3>
        <p></p>
        <p>
          پلتفرم بومی تلویزیون ترکیبی پخش زمینی دیجیتال و باند وسیع (HbbTV) با
          نام HbbTV Open Platform با HOP به همت کارشناسان مدیریت توسعه رسانه های
          نوین اداره کل فناوری رسانه های نوین در مرکز فناوری مجازی معاونت توسعه
          و فناوری رسانه توسعه داده شده است. برخی از ویژگی های این پلتفرم
          عبارتند از:
        </p>
        <ul>
          <li>نوشته شده با زبان TypeScript و فریم‌ورک‌ React</li>
          <li>توسعه و پیکربندی سریع و آسان اپلیکیشن‌ها</li>
          <li>طراحی کاربرپسند به همراه اطلاع ساعت سرور و غیره</li>
          <li>امکان استفاده در رزولوشن‌ها و نسبت‌های مختلف تصویر</li>
          <li>
            امکان راه‌اندازی به زبان‌های مختلف (چپ به راست و راست و به چپ)
          </li>
        </ul>
        <p>
          همچنین سورس کد برنامه به صورت آزاد روی سایت GitHub بارگذاری شده و
          توسعه‌دهنده‌ها می‌توانند اپلیکیشن‌های خود را روی چارچوب برنامه ایجاد
          کنند. آدرس پروژه:
        </p>
        <p className="ltr">https://github.com/faridv/hop</p>
        <p>
          <small>
            <span className="yellow">
              <ButtonIcon />
            </span>
            برای خروج از راهنما دکمه زرد را فشار دهید
          </small>
        </p>
      </InfoStyled>
      <Backdrop isVisible={visible} />
    </>
  );
}

export default Info;
