# CAPABLE

**Capability-Aware Policy Adaptation via Behavioral Latent Encoding**

CAPABLE helps a frozen vision-language-action policy adapt when a robot joint no longer produces the motion it was commanded to make. It learns a representation of the robot's current physical capability from joint command–response histories, grounds it in the live Jacobian, and uses residual reinforcement learning to correct the VLA's arm actions. It does not require fault labels, affected-joint identifiers, or fault-specific demonstrations at deployment.

### Results

| Evaluation | CAPABLE | Comparison |
| --- | ---: | ---: |
| 28 LIBERO tasks, globally unseen joint lock | **59.3%** | 41.9% global-history SAC; 24.8% frozen VLA |
| Healthy operation | **90.8%** | 91.4% frozen VLA |
| Physical Franka Panda, software-enforced joint locks | **24/30** | 13/30 global-history SAC |

CAPABLE also outperforms the matched global-history SAC baseline on six independently held-out actuator splits evaluated on a common eight-task subset.

**[Project page](https://capable-vla.github.io/capable-vla/) · [Presentation video](CAPABLE-SupVideo.mp4)**

University of Bremen · University of North Texas · Toyota Motor North America
