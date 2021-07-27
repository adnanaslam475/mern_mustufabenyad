import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Avatar } from "antd";
import moment from "moment";
// import { toast } from "react-toastify";
// import DashboardNav from "../components/DashboardNav";
// import { Link } from "react-router-dom";
// import { HomeOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ state }));
  const { user } = auth;

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            <div>Pending balance</div>
            <div>Payout settings</div>
          </>
        )}
    </div>
  );
};

export default ConnectNav;