import { group, sleep } from "k6";
import {TestSmoke } from "./Scenarios/Get-Test/Get-test-smoke.js";
import {TestLoad} from "./Scenarios/Get-Test/Get-test-load.js";
import {TestStress} from "./Scenarios/Get-Test/Get-test-stress.js";
import {TestSpike} from "./Scenarios/Get-Test/Get-test-spike.js";
import {TestScalability} from "./Scenarios/Get-Test/Get-test-scalability.js";
import {TestVolume} from "./Scenarios/Get-Test/Get-test-volume.js";
import {TestEndurance} from "./Scenarios/Get-Test/Get-test-endurence.js";

export default function () {
    group("Smoke Test", () => {
      TestSmoke();
    });
  
    group("Load Test", () => {
      TestLoad();
    });
  
    group("Stress Test", () => {
      TestStress();
    });
  
    group("Spike Test", () => {
      TestSpike();
    });
  
    group("Scalability Test", () => {
      TestScalability();
    });
  
    group("Volume Test", () => {
      TestVolume();
    });
  
    group("Endurance Test", () => {
      TestEndurance();
    });
  

  }