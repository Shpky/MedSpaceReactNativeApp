import React, { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, Button, Linking, TouchableOpacity, FlatList, ScrollView, ImageBackground } from 'react-native';

import { RootStackParamList } from '@navigation/RootStackParamList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import useActualPatient from '@hooks/useActualPatient';
import Mailer from 'react-native-mail';


type PrescriptionIndexProps = NativeStackScreenProps<RootStackParamList, 'Email'>
export default function MailIndex({ navigation, route }: PrescriptionIndexProps) {
    const { prescription } = route.params
    const [patient] = useActualPatient()

    const logo: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAO3RFWHRDb21tZW50AHhyOmQ6REFGMEVSTUctTUE6MixqOjgxMDkxNDYwMTAxNDczMzM3MDMsdDoyNDAxMDgyMQEyBFcAAATgaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9J2Fkb2JlOm5zOm1ldGEvJz4KICAgICAgICA8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgICAgICAgPGRjOnRpdGxlPgogICAgICAgIDxyZGY6QWx0PgogICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+MTQ0IC0gMTwvcmRmOmxpPgogICAgICAgIDwvcmRmOkFsdD4KICAgICAgICA8L2RjOnRpdGxlPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOkF0dHJpYj0naHR0cDovL25zLmF0dHJpYnV0aW9uLmNvbS9hZHMvMS4wLyc+CiAgICAgICAgPEF0dHJpYjpBZHM+CiAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgICAgICAgPEF0dHJpYjpDcmVhdGVkPjIwMjQtMDEtMDg8L0F0dHJpYjpDcmVhdGVkPgogICAgICAgIDxBdHRyaWI6RXh0SWQ+OTQzMGM4MjctYjQ3Yi00Nzg2LWJiODQtNDEzZjdkMTEwNDdhPC9BdHRyaWI6RXh0SWQ+CiAgICAgICAgPEF0dHJpYjpGYklkPjUyNTI2NTkxNDE3OTU4MDwvQXR0cmliOkZiSWQ+CiAgICAgICAgPEF0dHJpYjpUb3VjaFR5cGU+MjwvQXR0cmliOlRvdWNoVHlwZT4KICAgICAgICA8L3JkZjpsaT4KICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgPC9BdHRyaWI6QWRzPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgICAgICAgPHBkZjpBdXRob3I+Um9tYWluIEdvdXJhdWQ8L3BkZjpBdXRob3I+CiAgICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CgogICAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgICAgICAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkNhbnZhPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgICAgCiAgICAgICAgPC9yZGY6UkRGPgogICAgICAgIDwveDp4bXBtZXRhPrp8AKsAABiFSURBVHic7Z17dBTl+ce/O5tsbtwSEkqIJEoIYFCoBhqwIgpHECiFCoi1gEDlUtBW20q19vg72traHisFLaWIFqQXiC0eLoFIaCPIRUqgIOEaIBc3QEoCJZcll83u74+HJbvZmZ133nlndgL5nJOTZLM782bmmfd93udq83q9XtxOtLQAFy8CX34JlJfT9+pqoL4++Kuujj7TqRMQFxf81b070Ls3kJpK33v1AiQpvP+fydhuaQFqaACOHgUKC4EzZ0hgKioAt9uY80VGAikpJEwDBgBDhgCDBgFRUcaczwLcWgLkLzCHDgFFRcYJCysREcA99wBZWSRQgwcD0dHhHZNA2r8Aud3Avn3A9u3Arl0kRFYmOhoYORIYNw544AESsHZM+xQgr5dmmm3bgPx84Nq1cI+Ij65dgUcfBcaPp5nJZgv3iDTTvgSouhrIyQFyc4ELF8I9GrH06gVMmAA88QQp5+2E9iFAFRXAhx8CmzYBTU3hHo2xOBzA5MnA008DycnhHo0q1hagc+eANWuAvDzaft9O2O3AY48Bs2cD6enhHo0i1hSgc+eAd98Fdu8mfed2xmYDHnoIeO45oE+fcI8mCGsJUH09sHIlsH797TfjqGG3A9/+NrBwIRAbG+7R3MQaAuT1kmK8bBkpyh0ok5QEvPACMHasJXZt4Reg4mLg178GDh8O6zDaHfffD/zkJ0BGRliHET4BamkB/vAHUpI9nrAMod0jSaRkf+97tMSFgfAIUGUl8NOfAv/5j+mnviXJygJ++Uta3kzGfNfxnj2kDHYIjzgOHQKmT6drazLmzUDNzcDvfw+sW9exNTcKmw2YORN49lnTfGzmCNCVK7RzOHbM8FN1AAohefttICHB8FMZL0BOJ7BoEX3vwDzS0oAVKwx3hxirA509C8yd2yE84aCsjPxp584ZehrjBOiLL4DvfheoqjLsFB2oUFUFPPMM3QuDMGYJ27sXWLIEuH5d+KENoWtXEvbkZAp7LS2lqMaLF8M9stCkppINyOsFTp2iGf/IEcDlCnxfTAzw298Cw4YJH4J4Adq7lxTmcIeSsjJqFPDDH1I8jg+vlyIbS0qAHTso0rGsLHxjlGPECOC114Bu3Vpfc7tJeAoLgX/9C/jsM6C2lv4WEQH87ncUBSkQsQJ0/Dgwb571w0oBirtZuBD4zncoGD4UjY30hOfkAAUF4f//Hn8cePHF0MH6Hg9llezYAWzdSstYXBzwxz8CmZnChiJOgMrKyKzeHsJLExLIcjt0qDaHpMdDesWGDRTcduWKcWNUYupUUg+02HmamigrZfVqSjT44ANa/gQgRoAuXybhsbrOAFDazbJl+mJrvF56UHJyyDBaXy9ufKGYMgV46SV+v1dLC82kW7bQSiEgdFa/ANXW0mDOnNE9GMPJyKBANVE+I6+XYrPffRf45BMxx1Ri9Gjg5z8XkxLkdtNmoXdv9eVbBX0C5HaTkbCwUNcgTKFfP7rRiYnij+3xAPv3k1JrhNli6FBg6VLxgWQtLeTR1xFXpM8OtGJF+xCelBRg+XJjhAegm/D1r5MAiQ7ySkmh4xoRhWi36x4vvwDt3QusXavr5KbQvTv5hXr0MP5cZ8+KdRR36QL85jdAz57ijtkWl0tXZASfAFVVAa++an2vekwM8Oab5kTt1dQAGzeKO15kJEUc3n23uGPKsWUL7eo4l17tAuTxAK+8Aly9ynVCU1myhIKtzODzz8UaG2fMoPRnI6mvp11kdTXdU47IUO0CtGoVcPCg5o+ZztNPAxMnmnMurxf4xz/EHe/BB4H588UdTwn/DN+DB+neakSbABUXkzHK6owYASxYYF6tnlOnxMU6JSdTuK/RJWEaGoKX3NWr6R5rgP0Ke73AG29YPwC+d2/g//7P3BIqotwbsbHA668bqzT78NVM8sfjIaVdg27LLkC5uYaGBQjBdwNMiMS7yfXrwD//KeZY8+ez62x6NjBuN1nR5Th0iO41I2wCVFND5n+rs2gRhXOy4PO4682APXaMrLp6GT0aeOop9fft3w+8/74++43TSWYYJZYtY3bPsAnQypXWzxgdNQqYNo39wl68SOENeqt9bN2qXwhTUoAf/zi0g9TlogTM554DOnfWd76tW0PPYNXVlLPHgLoAFRcrT3dWoVcvUjxZ/ToVFZS50NREtiJerl3Tn54UEwP87GfAV76i/J7qamDxYooCsNn0edJdLmDnTvX3rV/PpFCrC9CKFdZWnO12smGw6j0VFfQUl5aSf0wPRUX6C13NnAlkZyv/vbSUnNVHj9LvXbpQwDwvJ06wLbkeD917FUIL0PnzFI1nZZ56KvQN8Ke6mmaq0lL6/b779J07L0+fMpudTWEwSpw/T3qdb7wAEB/Pn2nh8QCbN7O/f9cu1aD80AJkdZtP377s9p7r18kp6bPXJCbq84/pXb4SEoCXX1Y2N5SW0jJ76VLg63rcMvX1oZVnOdasCfln5SvvdFIBS6sSGUn+OFYv9fLlgam/fftSAXFevviCP4DObqe4cSVd5vJlcsO0FR5An2umqEi7CyovL+T/qSxA69ZZu8jTnDnAwIHq7/N6gb/9Dfj73wNf1xtMtWcP//I1dqyyn6uujpbZs2eD/+Zw8Je783op0F4rLS0kCwrIC1B1tba10mzuvpt0B5Yt+9GjFEjW9mG4/37+87tcwIEDfJ9NSQF+8AP5Zbexkbbqhw7Jf7ZbN/5QXJcL+Pe/+T778ceKM5e8AOXk0D9jRRwOekJZXBWVlbRDa5ufJknsBkc5Tp3iW74cDsqmUAqpXbcutBX4zjsph42H8+epLwgPjY1kQpAhWIC8XirgbVVmzWJLS2luJp+Y3I3u3z8wn0or+/bR8bUyYQI5euXYtUt90zJ8uPZz+tBb+iU3V3bJDhagw4fJVmJF0tNJ92FZuj74QDnsZOBAfgOi2619JwOQwrx4sfzYnU5KMwplFY+I4M/namrSX0KwokLWFxosQHl5+k5kFDYb7UxYbvyBA7T9VFJyhw7lH8fZs9p9Xw4H8KMfyRs7XS7gF7+gnVcokpLYNg1y1NSICTfZujXopUABam5mM3OHgylT2LawV65Q2ImSDhcZqU//KSrSnvP/6KMUJCbHunVsym3fvvyB9YcPi6nwv3Nn0NIdKEB79lgzszQxkaZ/FoPhW2+FLieTkUHuAF4+/VTb+5OSyJost3T5ZkoWeHPavV6+JVeOa9dI//Mj8I5Ydfl6/nm23UdurrrxU4/+U1mpPYFywQJ518O1axTwz7LbdThI8efB5SL/lyi2bw/4tVWA3O6wFGlUJTsbGDNG/X1OJ6XvqBk/hwzhH8vJk9rCWrKyaOfVFq+XwiVYg/ATE/kdv1evii0ytWdPQOWVVgE6ccJ69Xx8yqdaIQGvl55mNTN9VBTw1a/yj2f/fnbrc2wslY2Ri23et4+Mc6zo1X9E0mZGaxUgJetnOHnySTbT/caNlFajRmYmv/7jdmu7RlOnyud01dRQmrIWO5Ie/ceIzGG/69AqQFZL1UlKoqphajafixepfDBLzFJGBn+2Q0kJ8N//sr03LU05TGPtWrIKsxIZye+Bd7lo2RWNn1CSADU2Wq9XxeLFbKGbS5cC//sf2zH1+L9OnmxtAx4KSaJdl5yl+8QJ7dGdCQnkwuChpiYwlkgUR4/e1INIgI4ds1YnwHvuYcvKLCigLy3H5YXVefrAA8AjjwS/3tBAwq61llDPnhRExsOpU8ZEVPjpQSRAVquw8eKL6qEWNTVUOJL1AqWm8us/TU1sW+G4OJo55ZT+/Hw+PVPPrvHIEf7PqnHD+EkCdOqUcSfSyje+wWayf+89bfHI/fvz72TOnVN3NQBkLZez11RXU21CHnhnzaYmY+9rwAwkIq9JBLGxVLZWzeJ88mRwgJgamZn8qc5nzgSXzm1LSgoVRJDjT3/iC77v0oU/A6O+Hjh9mu+zLNywYUlwu61TSX7mTPW0Xq+Xli6t8Up6FGgW/Wf+fPkCVsXF/MF5SUn8AlRdTcu8UVRUAC0tkHDpkjVqOvfoQU+w2rZ961bta3tcHHDHHXzjYtF/srLkreUtLVTxgmX3JseAAfwFNY3UfwC6LhcvQjJkm8fDokV0o0NRUwO88472PLWMDOP0H4eDll05+9KBA/rSovQE0Juh15aXQ7JEBfaBA4Hx49Xft3YtXyWtPn34DYinT4d28YwZI59f5nKR4sw7u0tSYPV8LTQ1GWP/aUtZGSRLKNDf/766v6u8nLIreNBTEzrUUtClCzUzkVt2Cwr0BXHFx1PmCA91dfJZHaL58ktITNtTI3noIbapevly/ho8vBmobnfokjZPPimv5NbWUkitHuLjQ+fLh8JoBdrHpUuQwtr3QZIoT11te11YCOzezXeOqCj+G1FSorxkpqVRn1I5tm2jz+rhrrv4zQ5Gbt/9aWiAxL1DEMHkyerLi8dDeV28ukR6Or8CXVKivIN65hl5F0NVFfDhh3zn80eP28UsAaqrg2Ran4e2xMWR7URt256XR3HIvNx1F78CraT/DBpEBaHk2LxZf88QSeLPQPV45FOijaChIYxL2IwZ6sUNGhv1l5dJT+ev5iUnQHY7mRzkEhurqrRbyOXo0oXfbnX9unmehfp6SDcbkplJUhJbObePP9b/NPfty/e5ykr5+J+vfU1ZKd+0SczT37Urv97mcvFnoGqlvj5MM9CcOeqxPrW15DDVWw2fdyk4dy44QyUqimYfuUiBy5fF1YqOj+dfdq9dM68hXkMDJNNqKftITaVwTzVycvRXw09IULduK1FSEhwqMnKkcuuB/Hxxuoceu5XJdj3J1HrKAJn91YyGtbXAX/+q/1x33MH/JB8/Hvi7T+mXe+BqasTWkRwwgP+zZhgQfURHQ+J+QnnIzKQsTTU2bBDTiyMlha8GkNsd7EAdO5Z2dHIUFIh78m02fhcGYJ7+AwBxcSbPQEp1cfwRNfsANAPxLNFOZ2CcdbduwNy58ru569f5XSxyxMTwt6K84SE3jbg4E2eg7Gy28Mz169mD5NXgVaArKgJjl7/5TeVZYd8+zf0lQtK1K3/txoYGtshJUURHQ9JVJ5AVm41cFmr2GJGzD8CfzeCvQHfrpuyyaGmh2Ud0kzneIPqGBvbUIxF07mzSEjZqFFvjtJwcccUdbDb+pcDfFTBpknJZ3ePHg5VtvejppFxXZ25luehoSMI6GCths7G5LBoaxFhxfSQkULAXDz4FulMnap+gxPr14m8YbwgHYK4CDQCJiZBENaBXZNIkNmtwbi5Zf0WRlKRuLpDDPxRi3Djl2aesjHLlRcNbRBwwX4DuvBOSrrL5akREKAdc+dPSAvz5z2LPnZjIt4W/cIEU6NhYcrcojX3HDmNqKenZwptdmjAtDRK3osnCxIlsF+TTT8VbUHv04JuBnE5aTh95RHk5qauTLfemG0nir8IKmF8cLDUVEnr25LvQasTGkt+Ihb/8RXwHaF7drrycPO4zZijbkPbtMyYVKiaGX4Cam6m8n1k4HEByMiRERPCHDoRi2jS2HUVRkTGdEHl1iTNnqJxuKBvSxo3GtDyPjeUvP9zYaK4ApaQAdvuNzFTRinRsLCUJsrB+vTHtpHhtKefPk+6jNCufOCGuwW5boqP5nb+NjeYaEW/oziRAepx3ckybxta/q6qKlFEj4HmSr1yhzNjBg5XfU1BgXCW32Fh9AmSmDnSj5B4JkJ4KEG3RMvt89JFxWbE8S1hFBSn+SkU4Wbv98aLHqGt2bPsNmSEBuvdefqNbW554gm32aWnRVidQCw4HX0qw3R66eV1hobHxNrzLLmBOGo8Ph4NkBj4Bioq6+YIutMw++fl8WaYsxMTwCdCAAaGFX6FfhDD0bGbMLJBx770346xa96l68rB9TJ3K/hR99JH+8ynRowefEVGSlA2HlZX6G+yqoacAulr5GZH4yUqrAOnVgyIjKVOThZKS1iayRhAXx1/VQomDB42bMX3oWcLMbMvuJyutAqRXD5o4Ub22j4/Nm43tBN2li3gBMqMFlp5+8CIiOFmIjg5Qd1oFKCqKvx6x3c6WpgPQrmvTJr7zsBIRwZ8LJofTaU65FD097Hn6l/EwbFhAnHmgrV6uLD8Lw4ezZxIUFIiLOFQiIYE/r1yOgweNHzPAP2t6PNqrv/IycWLAr4FX+cEHtU+jNhv7zgswZykQOfsAxhk7/XE4+JewlhZzlOjOnYPaVgUKUFQUW9aEP/36sSvgV6+a09BFZJjupUvmpcrwCr7bbc4MNGZM0O42eJ5/7DFtB50+nf0fz8szp5W4Hl2iLYcOmbPDiY3V18fDjBlIRjaCBSgrizytLHTurE3gPvmE/b16EGns01PjUAuSpG/nKHrZbkuvXrKVboMFyGZjV6YnTWL331RWGufFbgurOUGN2lp9pWXMoqXF+FZdEyfKCqn8VmXaNPWUYEnStmvLzzfWDeAPjxVajqIic0MkeGluNtaZGhVFPk4Z5AWoe3fgW98KfdDMTG1tGHmLbYeTzz83R2cD6Ok2ehniZfJkRSu5srFk5szQazJLWV4f5eVi2y6aBUs3ZVHExemLhzYKux2YNUvxz8oClJysrCBHRlKxAVY++8y85UsUTqfYNCM1rDoDjR8fMrYqtLl29mz5fyorS5vjj7XXlpUoLrZmC3QzsdmUOy/eILQApacDDz8c/PqIEeyDaGiwZj9WNQ4fbn+zpmgefli5pM0N1B1GixYFBpjb7eRQY+XIEet1g2bBak34zCYigiktS12A0tMD43y6dVOVygCs1syXhepqc+NrrAhjx2w2l/WCBa05XizdBH14vca3HTKC0tLbW/9JSqJ7zgCbAMXFUXUxQFv5WbfbmLbTRuN0mhdfY0Wef545vYg9aGbCBNp9aYlaLC42r+SsSIzIlG0vZGVp8m+yC5DNBixZoq0CBEunYyPQa08JRxM+lwthKfruT0QE3WMN109b2F5GBjUBYc2N0tuxhpfCQv4teHOzuWXifNTUUFp1OJk7l+6xBrTHfc6eTflRak+L10uFCsLBxo3A22/zmQ+qqswLD/WnsRF4+WXyGZrlf/Nn6FCqJKcR7QIkSeStf/VVdQEJVzdEr5dKxsycSSG0WtKnL18On92qpgZ4/XUa986d2gRJj9Gze3fgjTe44sj5Is8TE4EpU6jnxa9+JR/y2dwc/lCI8+dJ0KdMod7tLNmbNTXh3YF5PJQB8tJLwOOPA++/r166zuHgd8TabMBrr8m3LGf5uNerQ3SXLwfWrKF4kfvuo6Cjhx6iLaDTSfWVrUR0NIWgjB5NPb8GDgyOONi+HXjllfCMT4noaAqSGzGCxtynD5VX8cU91dWRasGjQ82eTT1rOdEnQG439b7w+bpsNortzc6m8nBr13If2nAiI0nQMzNJcfQV9y4spNQjq2Kz0YwTHU259KmptARt2aLd+DlkCPVj01GhTp8AATTlz5sntlp7B8bTrx+109KTDQsRAgTQtnfOHHP7NHTAT3IyqR4CaoSLSd/s0YOmQitG1HUQSEIC3StBBebF5f+mpVF3ZZE5WR2IJTaWNj4Ca4OLbVc4cCDw1lviK2N0oJ/ISLo3mZlCDyu+3+Xw4cA77/AXi+xAPLGxwLJl2gIBGRGjRMtx4gS1eDKrbk0H8sTH07KlJY5LA8YJEEAW1MWLza3f10ErvXvTamBgQx1jWzb37k2m+Bs1hTswkf796dob3I3J+J7fSUnAqlWGrL8dKDBsGLB6Nbd/SwvGLmH+eDxk+XzvPWPrI97OSBJlUsyeLbZCWwjMEyAfhYUU93K7Zz2IJiEBePNNsV0HGDBHTP0ZMoQa1Q4davqpb1mys4ENG0wXHiAcM5AP35K2alVHBigvvn608+aZtmQFDSFsAuTj9GkKSrudMyF4GDSIVAEtJXYMIPwCBNAMlJsLLF3aYXhUIz4eeOEFSrOyQDUPawiQj5oaYOVK6h/fsVMLRJKoStjChfp6agjGWgLk4/Rp8uzv3RvukViDESOAZ5/VnHJjBtYUIB/FxRQMn58fnlSXcCJJVJd5zhxLCo4PawuQD6cTWLeOemw0NYV7NMbicFAywqxZxjRDFkz7ECAf1dWkH+XmAhcuhHs0YunVi8rJTZ/O1u3aIrQvAfLh9VK/sW3baHlrr6VYunal1hLjx1OjXwvsqrTSPgXIH7eb+m9s3w7s3k0pwlYmOhoYORIYN47aa+lIqbEC7V+A/GlooJmpsJBy1YqKjOsKzUpEBBWkyMoiV8Pgwfq6M1uMW0uA2uIvUGfOAGVlVJ7GqB2d3U59RtLSyEI8ZAhZjG8hgWnLrS1AcrjdJETl5SRQVVWUGlxbS1++n33fAUq+69Qp8Lvv58RECtpKSyPhaedLklb+H8OHwkIS+J7kAAAAAElFTkSuQmCC"
    if (!patient) {

        return null;
    }

    if (!prescription) {

        navigation.goBack();
        return null;
    }

    if (!patient.calendar) {

        return null;
    }

    let htmlcalendar: string = ""
    const PrescriptionCalendarFounder = (wcalendar: Wcalendar): Wcalendar => {
        prescription.medicines.map((medicine, index) => {
            for (const key in wcalendar) {
                for (const dayKey in wcalendar[key]) {
                    for (const prise of wcalendar[key][dayKey]) {
                        if (prise.releatedTreatment != prescription.title) {
                            wcalendar[key][dayKey].slice(wcalendar[key][dayKey].indexOf(prise), 1)
                            if (wcalendar[key][dayKey].length == 0) {
                                delete wcalendar[key][dayKey]
                                if (Object.keys(wcalendar[key]).length == 0) {
                                    delete wcalendar[key]
                                }
                            }
                        }

                    }
                }
            }
        })
        return wcalendar
    }

    type weekColor = { [Wnumber: string]: string[] }
    const generateCalendar = (): weekColor => {
        let weekColor: weekColor = {}
        if (!patient.calendar) return weekColor
        const wcalendar: Wcalendar = PrescriptionCalendarFounder(patient?.calendar)
        for (const key in wcalendar) {
            weekColor[key] = ["grey", "grey", "grey", "grey", "grey", "grey", "grey"]
            for (const dayKey in wcalendar[key]) {
                let ckey = new Date(dayKey).getDay()
                weekColor[key][ckey] = statusPrise(wcalendar[key][dayKey])
            }
        }
        return weekColor
    }
    const statusPrise = (prise: priseInterface[]): string => {
        let status = prise.every((p) => p.consome == true)
        if (status) return "green"
        status = prise.some((p) => p.consome == true)
        if (status) return "orange"
        return "red"
    }

    const handleCaptureImage = async () => {


        try {
            let htmlContent = `
                        
                        <body style="font-family: Arial, Helvetica, sans-serif">
                        <div style="text-align: center; margin-bottom: 20px; margin-top: 20px;">
                        <div style="display: flex; justify-content: space-evenly;align-items: center;margin-top:80px">
                            <img src="${logo}" />
                            <h1 style="font-size: 30px; font-weight: bold;">MEDSPACE</h1>
                        </div>
                        <div style="display: flex; justify-content: space-evenly;align-items: center;margin-top: 50px;">
                            <h2 style="font-size: 30px; font-weight: bold;">Ce document constitue le rapport de prise
                                médicamenteuse pour le patient M./Mme.${patient.name} dans le constext de son traitement
                                ${prescription.title}.</h2>
                        </div>
                        <div style="display: flex; justify-content: flex-start;align-items: flex-start;margin-left: 20px;">
                            <h3 style="font-size: 20px; font-weight: bold;">Ce document a été généré le ${new Date().toISOString().split("T")[0]}.</h3>
                        </div>
                        <h2 style="dashed;page-break-before: always;">Rapport de prise des médicaments par le patient par semaine.</h2>
                        <div style="border-color: black;border-width: 1px;border-style: dashed;margin-left:20px;margin-right:20px">
                            <p style=""><b>Légendes</b></p>
                            <div style=" display: grid;grid-template-rows: repeat(4, 30px);row-gap: 5px;">
                                <div style="display: flex;align-items: center;">
                                    <div style="background-color: green;width: 10px;height: 10px;margin: 10px;;border-radius: 50%;">
                                    </div>
                                    <p style="">Tout les médicaments ont bien été pris par le patient.</p>
                                </div>
                                <div style=" display: flex;align-items: center;">
                                    <div style="background-color: orange;width: 10px;height: 10px;margin: 10px;border-radius: 50%;"></div>
                                    <p style="">Tout les médicaments n'ont pas été prit</p>
                                </div>
                                <div style="display: flex;align-items: center">
                                    <div style="background-color: red;width: 10px;height: 10px;margin-left: 10px;margin-right: 10px;border-radius: 50%;">
                                    </div>
                                    <p>Aucun des médicaments n'a été pris par le patient.</p>
                                </div>
                                <div style="display: flex;align-items: center;">
                                    <div style="background-color: grey;width: 10px;height: 10px;margin: 10px;border-radius: 50%;"></div>
                                    <p style="">Jour(s) non concernés par la durée du traitement</p>
                                </div>
                            </div>
                        </div>
        <div style="margin-top:20px">
        <p>Médicament(s) dans ce traitement ${prescription.medicines.map(e => e.name).join(", ")}</p>
        <div style="display: flex;align-items: center;justify-content:space-evenly"><p>Nº de semaine/année</p><p>Jours de la semaine et satus de la prise de médicament.</p></div>
        ${htmlcalendar}
        </div>
        <h2 style="page-break-before: always;margin-top:15px">Confidentialité du document</h2>
        <p style="color:black; font-size: 18px;margin-left:20;margin-right:20;text-align: justify;margin-top:20px ">
            La préservation de la confidentialité des informations médicales est
            une préoccupation primordiale dans la rédaction du présent rapport sur la prise de médicaments du patient. Ce document est considéré comme
            hautement confidentiel et son accès est strictement réservé aux professionnels de la santé impliqués directement
            dans les soins du patient. Toute divulgation non autorisée de ces informations est expressément interdite,
            conformément aux lois et réglementations en vigueur relatives à la protection des données médicales.
            <br><br>Les membres de l'équipe médicale sont tenus de respecter scrupuleusement la confidentialité des
            détails
            contenus dans ce rapport, et des mesures de sécurité appropriées ont été mises en place pour garantir la
            protection des données sensibles. Ces mesures comprennent l'utilisation de systèmes informatiques
            sécurisés,
            l'accès restreint aux informations médicales et la formation continue du personnel sur l'importance de
            maintenir
            la confidentialité des données.
            <br><br>La confidentialité de ce rapport vise à instaurer une relation de confiance entre le patient et
            les
            professionnels de la santé, favorisant ainsi un environnement propice à des soins de qualité. Tout
            professionnel
            de la santé ayant accès à ce document est tenu de respecter les principes éthiques liés à la
            confidentialité
            médicale et de prendre les mesures nécessaires pour prévenir tout risque potentiel de divulgation non
            autorisée.
        </p>
    </div>

</body>
                        
                    
                `;

            const options = {
                html: htmlContent,
                fileName: `${patient.name} + report`,

            };

            const pdf = await RNHTMLtoPDF.convert(options);

            const pdfFilePath = pdf.filePath;

            //await requestWritePermission();



            // Obtenez le chemin du dossier de stockage externe
            const externalDir = RNFS.DownloadDirectoryPath;

            // Copiez le fichier vers le dossier download
            const destPath = `${externalDir}/rapport.pdf`;
            await RNFS.copyFile(pdfFilePath || "", destPath);

            let email = prescription.doctor?.mail;
            let subject = 'Rapport de prise médicamenteuse pour la patient M./Mme.' + patient.name + ' dans le contexte de son traitement ' + prescription.title + '.';
            let body = 'Bonjour Docteur, \n\nVeuillez trouver ci-joint le rapport de prise médicamenteuse pour le patient M./Mme.' + patient.name + ' dans le contexte de son traitement ' + prescription.title + '.\n\nCordialement,\n\nL\'équipe MedSpace';

            const attachments = [
                {
                    path: destPath,
                    type: 'pdf',
                    name: 'rapport.pdf',
                },
            ];

            Mailer.mail(
                {
                    subject,
                    recipients: [email || ""],
                    body,
                    isHTML: true,
                    attachments,
                },
                (error, event) => {
                    if (error) {
                        console.error('Could not send mail:', error);
                    }
                }
            );
        } catch (error) {
            console.error('Error capturing image:', error);
        }

    };


    const RenderWeek = (week: string[], num: string) => {
        let dayOfWeek = ["D", "L", "M", "M", "J", "V", "S"]
        let htmlweek = `<div style="display: flex; justify-content: space-evenly;align-items: center;">`
        htmlweek += `<div style="display: flex; justify-content: space-evenly;align-items: center;"><p style="font-size: 20px; font-weight: bold;">${num}</p></div>`
        week.map((day, index) => {

            htmlweek += `<div style="display: flex; justify-content: space-evenly;align-items: center;"><p style="font-size: 20px; font-weight: bold;">${dayOfWeek[index]}</p><div style="alignSelf:center;height: 15px; width: 15px; background-color: ${day};border-radius: 50%;"></div></div>`
        })

        htmlweek += `</div>`
        htmlcalendar += htmlweek
        return (
            <View style={styles.centreurRow}>
                <Text style={styles.fontblack}>{num}</Text>
                <View style={styles.centreurRow}><Text style={styles.fontblack}>D</Text><View style={{ height: 10, width: 10, backgroundColor: week[0], borderRadius: 5, }}></View></View>
                <View style={styles.centreurRow}><Text style={styles.fontblack}>L</Text><View style={{ height: 10, width: 10, backgroundColor: week[1], borderRadius: 5, }}></View></View>
                <View style={styles.centreurRow}><Text style={styles.fontblack}>M</Text><View style={{ height: 10, width: 10, backgroundColor: week[2], borderRadius: 5, }}></View></View>
                <View style={styles.centreurRow}><Text style={styles.fontblack}>M</Text><View style={{ height: 10, width: 10, backgroundColor: week[3], borderRadius: 5, }}></View></View>
                <View style={styles.centreurRow}><Text style={styles.fontblack}>J</Text><View style={{ height: 10, width: 10, backgroundColor: week[4], borderRadius: 5, }}></View></View>
                <View style={styles.centreurRow}><Text style={styles.fontblack}>V</Text><View style={{ height: 10, width: 10, backgroundColor: week[5], borderRadius: 5, }}></View></View>
                <View style={styles.centreurRow}><Text style={styles.fontblack}>D</Text><View style={{ height: 10, width: 10, backgroundColor: week[6], borderRadius: 5, }}></View></View>
            </View>
        )
    }
    const ReportBuilder = () => {
        let calendar = generateCalendar()

        return (
            <View>
                <View style={[styles.centreurRow, { marginTop: 10 }]}><Text style={[styles.fontblack]}>Nº de semaine/année</Text><Text style={styles.fontblack}>Jour de la semaine/status</Text></View>

                <FlatList
                    data={Object.keys(calendar)}
                    renderItem={({ item }) => RenderWeek(calendar[item], item)}
                ></FlatList>

            </View>
        )
    }
    const EncadreLegend = () => {
        return (
            <View style={styles.encadreLegende}>

                <Text style={styles.fontblack}>Légendes</Text>
                <View style={styles.coleur}>
                    <View style={{ marginHorizontal: 5, height: 10, width: 10, backgroundColor: "green", borderRadius: 5, }}></View>
                    <Text style={styles.smallfont}>Tout les médicaments ont bien été pris par le patient.</Text>
                </View>
                <View style={styles.coleur}>
                    <View style={{ marginHorizontal: 5, height: 10, width: 10, backgroundColor: "orange", borderRadius: 5, }}></View>
                    <Text style={styles.smallfont}>Tout les médicaments n'ont pas été prit.</Text>
                </View>
                <View style={styles.coleur}>
                    <View style={{ marginHorizontal: 5, height: 10, width: 10, backgroundColor: "red", borderRadius: 5, }}></View>
                    <Text style={styles.smallfont}>Aucun des médicaments n'a été pris par le patient.</Text>
                </View>
                <View style={styles.coleur}>
                    <View style={{ marginHorizontal: 5, height: 10, width: 10, backgroundColor: "grey", borderRadius: 5, }}></View>
                    <Text style={styles.smallfont}>Nom concerné par la durée du traitement</Text>
                </View>
            </View>
        )
    }
    return (
        <>
            {/* Your JSX content goes here */}


            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                <Pressable onPress={handleCaptureImage} style={{ width: "95%", justifyContent: "center", alignItems: "center" }}>
                    <ImageBackground
                        source={(require('./title.png'))}
                        style={styles.background}
                    ><Text style={[{ justifyContent: "center", textAlign: "center", color: "black" }, styles.title]}>Pressez pour envoyer le rapport à votre médecin</Text></ImageBackground>
                </Pressable>
            </View>
            <Pressable></Pressable>
            <View style={{ width: "95%", alignSelf: 'center', marginTop: 20 }}>
                <View

                    style={[styles.background, { padding: 10, borderBlockColor: "black", borderWidth: 1, }]}
                >
                    <Text style={{ alignSelf: "center", textAlign: "justify", marginVertical: 10, color: "black", marginHorizontal: 10, fontWeight: 'bold', }}>Vous trouverez ci-dessous le résumé de votre rapport de prise de vos médicaments en fonction des semaines:</Text>

                    <EncadreLegend />
                    <Text style={[styles.fontblack, { fontSize: 12 }]}>Médicament(s) dans ce traitement: {prescription.medicines.map(e => e.name).join(", ")}</Text>
                    <ReportBuilder />
                </View>
            </View >


        </>
    );
};
const styles = StyleSheet.create({
    reportContainter: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        padding: 10,
        width: '100%',
        height: '100%',
        borderColor: 'black',
        borderWidth: 1,
    },
    centreurRow: {
        flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
    },
    centreur: {
        justifyContent: 'space-evenly', alignItems: 'center'
    },
    coleur: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    fontblack: {
        color: "black"
    },
    encadreLegende: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        margin: 5,
        borderStyle: 'dashed',
    },
    smallfont: {
        fontSize: 10,
        color: "black",

    },
    title: {
        fontWeight: "400",
        fontFamily: "Jomhuria-Regular",
        fontSize: 30,
        fontStyle: "normal",
        color: "#fff",
        textAlign: "center",
        padding: 10,

    },
    background: {


        resizeMode: 'cover',
        borderRadius: 30, 
        overflow: 'hidden',
    },
})









