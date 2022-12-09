import { useParams, Link } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../css/MatchingRoomDetail.css";
import React from "react";

import moment from "moment";
import Moment from "react-moment";
import "moment/locale/ko";

var baseURL = process.env.REACT_APP_BASE_URL;

function MatchingRoomDetail() {
  const user = useSelector((state) => state.user);
  let useParam = useParams();
  const [info, setInfo] = useState();
  const [participation, setParticipation] = useState();
  const [state, setState] = useState();

  const getDetail = async () => {
    const detail = await axios({
      method: "get",
      url: `${baseURL}/articles/${useParam.id}/matching_room/${useParam.detail}`,
    });
    setInfo(detail.data);
    setParticipation(detail.data.member);
    detail.data.member.includes(user.id) ? setState("취소") : setState("참가");
  };

  useEffect(() => {
    getDetail();
  }, []);

  const attendRoom = async () => {
    const attend = await axios({
      method: "post",
      url: `${baseURL}/articles/${useParam.id}/matching_room/${useParam.detail}/add/`,
    });
    alert(attend.data);
    getDetail();
    participation.includes(user.id) ? setState("참가") : setState("취소");
  };

  return (
    <Container style={{ padding: "0" }}>
      <h2 className="detail-title">상세 정보</h2>
      <div className="detail-card">
        {info ? (
          <>
            <div>
              <div>방 이름 : {info.content}</div>
              <div>
                참여 멤버 :{" "}
                {info.member.map((member) => {
                  return `${member}번 `;
                })}
              </div>
              <div>음식점명 : {info.restaurant}</div>
              <div>약속 시간 : {info.from_date}</div>
              <div>약속 내용 : {info.content}</div>
            </div>
          </>
        ) : null}
        <button onClick={attendRoom}>매칭 {state}하기</button>
        <Link>채팅하기</Link>
      </div>
    </Container>
  );
}

export default MatchingRoomDetail;
