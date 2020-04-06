import React, { Component } from "react";
import "../App.css";

const JobPicker = ({ renderDom,renderBackGroundColor }) => {
  return (
    <div class="flex-container-2">
      <div  className="row-direction" style={{ backgroundColor: renderBackGroundColor(0) }}>
          {/* {renderDom(0)} */}
        <div className="scale">1</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(1) }}>
        <div className="scale">2</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(2) }}>
        <div className="scale">3</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(3) }}>
        <div className="scale">4</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(4) }}>
        <div className="scale">5</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(5) }}>
        <div className="scale">6</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(6) }}>
        <div className="scale">7</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(7) }}>
        <div className="scale">8</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(8) }}>
        <div className="scale">9</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(9) }}>
        <div className="scale">10</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(10) }}>
        <div className="scale">11</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(11) }}>
        <div className="scale">12</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(12) }}>
        <div className="scale">13</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(13) }}>
        <div className="scale">14</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(14) }}>
        <div className="scale">15</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(15) }}>
        <div className="scale">16</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(16) }}>
        <div className="scale">17</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(17) }}>
        <div className="scale">18</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(18) }}>
        <div className="scale">19</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(19) }}>
        <div className="scale">20</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(20) }}>
        <div className="scale">21</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(21) }}>
        <div className="scale">22</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(22) }}>
        <div className="scale">23</div>
      </div>
      <div style={{ backgroundColor: renderBackGroundColor(23) }}>
        <div className="scale">24</div>
      </div>
    </div>
  );
};

export default JobPicker;
