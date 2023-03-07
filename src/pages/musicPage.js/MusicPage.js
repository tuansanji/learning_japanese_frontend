import React from "react";

function MusicPage() {
  return (
    <div>
      <div class="player">
        <div class="dashboard">
          <header>
            <h4>Now playing:</h4>
            <h2>String 57th & 9th</h2>
          </header>

          <div class="cd">
            <div class="cd-thumb"></div>
          </div>

          <div class="control">
            <div class="btn btn-repeat">
              <i class="fas fa-redo"></i>
            </div>
            <div class="btn btn-prev">
              <i class="fas fa-step-backward"></i>
            </div>
            <div class="btn btn-toggle-play">
              <i class="fas fa-pause icon-pause"></i>
              <i class="fas fa-play icon-play"></i>
            </div>
            <div class="btn btn-next">
              <i class="fas fa-step-forward"></i>
            </div>
            <div class="btn btn-random">
              <i class="fas fa-random"></i>
            </div>
          </div>

          <input
            id="progress"
            class="progress"
            type="range"
            value="0"
            step="1"
            min="0"
            max="100"
          />

          <audio id="audio" src=""></audio>
        </div>

        <div class="playlist"></div>
      </div>
    </div>
  );
}

export default MusicPage;
